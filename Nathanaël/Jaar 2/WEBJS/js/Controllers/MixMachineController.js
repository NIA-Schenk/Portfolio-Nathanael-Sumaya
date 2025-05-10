class MixingMachineController {
    constructor(
        machineModel,
        potModel,
        ingredientModel,
        collectedPotsModel,
        savedPotsModel,
        hallModel
    ) {
        this.machineModel = machineModel;
        this.potModel = potModel;
        this.ingredientModel = ingredientModel;
        this.collectedPotsModel = collectedPotsModel;
        this.savedPotsModel = savedPotsModel;
        this.hallModel = hallModel;
        this.machineViews = new Map();
        this.mixingTimers = {};

        // Bind model event
        this.machineModel.bindMachineListChanged(this.onMachineListChanged.bind(this));
    }

    // Register a view for a specific hall
    registerMachineView(hallId, machineView) {
        this.machineViews.set(hallId, machineView);

        // Set up bindings for this specific view
        machineView.bindCreateMachine(this.handleCreateMachine.bind(this));
        machineView.bindDeleteMachine(this.handleDeleteMachine.bind(this));
        machineView.bindStartMixing(this.handleStartMixing.bind(this));
        machineView.bindRemovePot(this.handleRemovePot.bind(this));
        machineView.bindDragDrop(this.handleAddPot.bind(this));
        machineView.bindCollectPot(this.handleCollectPot.bind(this));
        machineView.bindThrowAwayPot(this.handleThrowAwayPot.bind(this));

        // Update the view with current data
        this.updateView(hallId);

        if (this.hallModel) {
            const hall = this.hallModel.getHall(hallId);
            if (hall && machineView.updateWeatherInfo) {
                const effect = WeatherController.getWeatherMixingEffect(
                    hall.weatherType,
                    hall.weatherTemp
                );
                machineView.updateWeatherInfo(hall.weatherType, hall.weatherTemp, effect);
            }
        }
    }

    updateView(hallId) {
        const view = this.machineViews.get(hallId);
        if (!view) return;

        const hallMachines = this.machineModel
            .getAllMachines()
            .filter((machine) => machine.hallId === hallId);

        const pots = this.savedPotsModel.getAllSavedPots();
        const ingredients = this.ingredientModel.ingredients;

        view.displayMachines(hallMachines, pots, ingredients);

        // Set up timers for machines that are already mixing
        hallMachines.forEach((machine) => {
            if (machine.isMixing && !this.mixingTimers[machine.id]) {
                this.setupMixingTimer(machine);
            }
        });
    }

    onMachineListChanged(machines) {
        // Update all registered views
        for (const [hallId, _] of this.machineViews) {
            this.updateView(hallId);
        }
    }

    handleCreateMachine(name, mixSpeed, hallId) {
        this.machineModel.createMachine(name, parseInt(mixSpeed), hallId);
    }

    handleDeleteMachine(id) {
        if (this.mixingTimers[id]) {
            clearInterval(this.mixingTimers[id].intervalId);
            delete this.mixingTimers[id];
        }
        this.machineModel.deleteMachine(id);
    }

    handleAddPot(machineId, potId, potMixSpeed) {
        const machine = this.machineModel.getMachine(machineId);
        if (machine && machine.potId === null) {
            const pot = this.savedPotsModel.getSavedPot(parseInt(potId));
            if (pot) {
                if (machine.mixSpeed !== potMixSpeed) {
                    alert(
                        `Cannot add pot. Machine mix speed (${machine.mixSpeed}) does not match pot mix speed (${potMixSpeed}).`
                    );
                    return;
                }
                this.machineModel.addPotToMachine(machineId, pot.id, potMixSpeed);
            } else {
                console.error("Pot not found:", potId);
            }
        }
    }

    handleRemovePot(machineId) {
        const machine = this.machineModel.getMachine(machineId);
        if (machine && machine.potId && !machine.isMixing) {
            this.machineModel.removePotFromMachine(machineId);
        }
    }

    handleCollectPot(machineId) {
        const machine = this.machineModel.getMachine(machineId);
        if (!machine || !machine.potOutput) return;

        const outputPotId = machine.potOutput;
        const pot = this.savedPotsModel.getSavedPot(outputPotId);

        if (pot) {
            const blendedColor = this.calculateBlendedColor(
                pot.ingredientIds,
                this.ingredientModel.ingredients
            );

            // // Add debug logging
            const collectedPot = this.collectedPotsModel.collectPot({
                ...pot,
                color: blendedColor,
            });
        } else {
            console.error("Pot not found for collection:", outputPotId);
        }

        this.machineModel.removeOutputPot(machineId);
    }

    handleThrowAwayPot(machineId) {
        const machine = this.machineModel.getMachine(machineId);
        if (!machine || !machine.potOutput) return;

        this.machineModel.removeOutputPot(machineId);
    }

    handleStartMixing(machineId) {
        // Check weather conditions for the hall
        const machine = this.machineModel.getMachine(machineId);
        if (!machine) return;

        const hall = this.hallModel.getHall(machine.hallId);
        if (!hall) return;

        const pot = this.savedPotsModel.getSavedPot(machine.potId);
        if (!pot) return;

        const weatherEffect = WeatherController.getWeatherMixingEffect(
            hall.weatherType,
            hall.weatherTemp
        );

        // Check if max number of machines allowed is exceeded
        if (weatherEffect.maxMachines !== undefined) {
            const activeMachinesInHall = this.machineModel
                .getAllMachines()
                .filter((m) => m.hallId === machine.hallId && m.isMixing).length;

            if (activeMachinesInHall >= weatherEffect.maxMachines) {
                alert(
                    `Weather conditions in ${hall.cityLocation} (${hall.weatherTemp}°C) only allow ${weatherEffect.maxMachines} machine(s) to operate at once.`
                );
                return;
            }
        }

        const ingredientIds = pot.ingredientIds;
        if (ingredientIds.length === 0) return;

        // Calculate base mixing time
        let maxMixTime = 0;
        ingredientIds.forEach((id) => {
            const ingredient = this.ingredientModel.ingredients.find((i) => i.id === id);
            if (ingredient && ingredient.mixTime > maxMixTime) {
                maxMixTime = ingredient.mixTime;
            }
        });

        maxMixTime *= weatherEffect.multiplier;

        const updatedMachine = this.machineModel.startMixing(machineId, maxMixTime);
        this.setupMixingTimer(updatedMachine);
    }

    setupMixingTimer(machine) {
        if (!machine.isMixing || !machine.mixEndTime) return;

        const startTime = new Date(machine.mixStartTime);
        const endTime = new Date(machine.mixEndTime);
        const totalDuration = endTime - startTime;
        const hallId = machine.hallId;

        const intervalId = setInterval(() => {
            const now = new Date();

            const elapsed = now - startTime;
            const progress = Math.min(1, Math.max(0, elapsed / totalDuration));
            const percentComplete = Math.round(progress * 100);

            // Update the view for the specific hall
            const view = this.machineViews.get(hallId);
            if (view) {
                view.updateMixingStatus(machine.id, percentComplete);
            }

            if (now >= endTime) {
                clearInterval(intervalId);
                delete this.mixingTimers[machine.id];

                this.handleMixingComplete(machine.id);
            }
        }, 100);

        this.mixingTimers[machine.id] = {
            intervalId,
            startTime,
            endTime,
        };
    }

    handleMixingComplete(machineId) {
        const updatedMachine = this.machineModel.finishMixing(machineId);

        if (updatedMachine && updatedMachine.potId) {
            this.machineModel.setOutputPot(machineId, updatedMachine.potId);
            this.machineModel.removePotFromInput(machineId);
        }
    }

    calculateBlendedColor(ingredientIds, allIngredients) {
        return ColorUtils.calculateBlendedColor(ingredientIds, allIngredients);
    }
}
