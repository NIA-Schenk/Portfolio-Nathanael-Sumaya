class MixingMachineView {
    constructor(hallId) {
        this.hallId = hallId;
        this.app = DOMHelper.getElement("body");

        this.machineSection = DOMHelper.createElement("section", "machine-section");

        this.weatherInfoDisplay = DOMHelper.createElement("div");
        this.weatherIcon = DOMHelper.createElement("span", "weather-icon");
        this.weatherTemp = DOMHelper.createElement("span", "weather-temp");
        this.weatherEffect = DOMHelper.createElement("p", "weather-effect");

        this.machineForm = this.createForm();

        // Machines container
        this.machinesList = DOMHelper.createElement("div", "machines-list");

        // Add to machine section
        this.machineSection.append(this.weatherInfoDisplay, this.machineForm, this.machinesList);

        // Append everything to the app
        this.app.append(this.machineSection);

        this.setupDragAndDrop();
    }

    createForm() {
        const form = DOMHelper.createElement("form", "form-container");

        const machineNameContainer = DOMHelper.createElement("div", "input-container");
        const machineNameLabel = DOMHelper.createElement("label");
        machineNameLabel.textContent = "Machine Name:";
        this.machineNameInput = DOMHelper.createElement("input");
        this.machineNameInput.type = "text";
        this.machineNameInput.placeholder = "Enter machine name";
        this.machineNameInput.id = "machineName";
        this.machineNameInput.required = true;
        machineNameLabel.setAttribute("for", "machineName");
        machineNameContainer.append(machineNameLabel, this.machineNameInput);

        const machineSpeedContainer = DOMHelper.createElement("div", "input-container");
        const machineSpeedLabel = DOMHelper.createElement("label");
        machineSpeedLabel.textContent = "Mix Speed (1-10):";
        this.machineMixSpeedInput = DOMHelper.createElement("input");
        this.machineMixSpeedInput.type = "number";
        this.machineMixSpeedInput.min = "1";
        this.machineMixSpeedInput.max = "10";
        this.machineMixSpeedInput.value = "1";
        this.machineMixSpeedInput.id = "MachineSpeed";
        this.machineMixSpeedInput.required = true;
        machineSpeedLabel.setAttribute("for", "MachineSpeed");
        machineSpeedContainer.append(machineSpeedLabel, this.machineMixSpeedInput);

        this.createMachineButton = DOMHelper.createElement("button", "create-btn");
        this.createMachineButton.textContent = "Create Mixing Machine";

        form.append(machineNameContainer, machineSpeedContainer, this.createMachineButton);
        return form;
    }

    updateWeatherInfo(weatherType, temp, effect) {
        this.weatherIcon.textContent = this.getWeatherIcon(weatherType);
        this.weatherTemp.textContent = `${temp}°C`;
        this.weatherEffect.textContent = effect.description;

        // Visual indicator for weather effects
        this.weatherEffect.classList.remove("warning", "danger", "normal");

        if (effect.multiplier > 1.1 || effect.maxMachines < 2) {
            this.weatherEffect.classList.add("warning");
        } else if (effect.multiplier > 1.2) {
            this.weatherEffect.classList.add("danger");
        } else {
            this.weatherEffect.classList.add("normal");
        }
    }

    getWeatherIcon(weather) {
        switch (weather.toLowerCase()) {
            case "rainy":
                return "🌧️";
            case "snow":
                return "❄️";
            case "sunny":
                return "☀️";
            case "cloudy":
                return "☁️";
            case "stormy":
                return "⛈️";
            default:
                return "🌤️";
        }
    }

    setupDragAndDrop() {
        // These handlers will be set up in the bindDragDrop method
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    displayMachines(machines, pots, ingredients) {
        while (this.machinesList.firstChild) {
            this.machinesList.removeChild(this.machinesList.firstChild);
        }

        if (machines.length === 0) {
            const emptyMessage = DOMHelper.createElement("p", "empty-message");
            emptyMessage.textContent = "No mixing machines created yet. Make one!";
            this.machinesList.append(emptyMessage);
        } else {
            machines.forEach((machine) => {
                const machineCard = DOMHelper.createElement("div", "machine-card");
                machineCard.style.userSelect = "none";

                const machineHeader = DOMHelper.createElement("h3");
                machineHeader.textContent = machine.name;

                const machineBody = DOMHelper.createElement("div", "machine-body");

                const machineLayout = DOMHelper.createElement("div", "machine-layout");

                // Mixing area
                const mixingArea = DOMHelper.createElement("div", "mixing-area");
                mixingArea.dataset.machineId = machine.id;

                if (machine.mixSpeed !== null) {
                    const mixSpeedBadge = DOMHelper.createElement("div", "mix-speed-badge");
                    mixSpeedBadge.textContent = `Mix Speed: ${machine.mixSpeed}`;
                    mixingArea.append(mixSpeedBadge);
                }

                const machineLid = DOMHelper.createElement("div", "machine-lid");
                machineLid.textContent = "MIXING...";
                if (machine.isMixing) {
                    const animationDuration = 2 / machine.mixSpeed + "s";

                    mixingArea.style.animationDuration = animationDuration;

                    machineLid.classList.add("lid-closed");
                    mixingArea.classList.add("shaking");
                } else {
                    machineLid.classList.add("lid-open");
                }

                // Machine info
                const machineInfo = DOMHelper.createElement("div", "machine-info");

                const statusLabel = DOMHelper.createElement("label", "status-label");
                statusLabel.textContent = "Status: ";

                const statusValue = DOMHelper.createElement("span", "status-value");

                const isMixed = machine.potOutput !== undefined && machine.potOutput !== null;
                if (machine.isMixing) {
                    statusValue.textContent = "Mixing...";
                    statusValue.classList.add("mixing-status");
                } else if (isMixed) {
                    statusValue.textContent = "Mixed";
                    statusValue.classList.add("mixed-status");
                } else {
                    statusValue.textContent = "Ready";
                    statusValue.classList.add("ready-status");
                }

                const statusInfo = DOMHelper.createElement("p", "status-info");
                statusInfo.append(statusLabel, statusValue);

                machineInfo.append(statusInfo);

                const potId = machine.potId || machine.potOutput;

                if (potId) {
                    // Find current pot - check both regular pots list and saved pots
                    let currentPot = pots.find((pot) => pot.id === potId);
                    console.log(currentPot);

                    // If pot not found in regular pots, it might be a saved pot
                    if (!currentPot && window.savedPotsModel) {
                        currentPot = window.savedPotsModel.getSavedPot(potId);
                    }

                    if (currentPot) {
                        const potVisual = DOMHelper.createElement("div", "pot-in-machine");

                        if (machine.isMixing) {
                            const now = new Date();
                            const startTime = new Date(machine.mixStartTime);
                            const endTime = new Date(machine.mixEndTime);
                            const totalDuration = endTime - startTime;
                            const elapsed = now - startTime;
                            const progress = Math.min(1, Math.max(0, elapsed / totalDuration));

                            const mixingIndicator = DOMHelper.createElement(
                                "div",
                                "mixing-indicator"
                            );
                            const progressBar = DOMHelper.createElement("div", "progress-bar");
                            progressBar.style.width = `${progress * 100}%`;
                            mixingIndicator.append(progressBar);

                            // Show estimated time remaining
                            const timeRemaining = Math.max(0, endTime - now);
                            const secondsRemaining = Math.ceil(timeRemaining / 1000);

                            const timeDisplay = DOMHelper.createElement("p", "time-remaining");
                            timeDisplay.textContent = `Time remaining: ${secondsRemaining}s`;

                            mixingIndicator.append(timeDisplay);

                            // Add mixing indicator directly to the mixingArea first, before the pot
                            mixingArea.append(mixingIndicator);
                        } else if (isMixed) {
                            // Pot is mixed and ready to be collected
                            if (currentPot.ingredientIds && currentPot.ingredientIds.length > 0) {
                                const blendedColor = ColorUtils.calculateBlendedColor(
                                    currentPot.ingredientIds,
                                    ingredients
                                );
                                potVisual.style.backgroundColor = blendedColor;
                                potVisual.classList.add("mixing-complete");

                                // Add mixed indicator
                                const mixedIndicator = DOMHelper.createElement(
                                    "div",
                                    "mixed-indicator"
                                );
                                potVisual.append(mixedIndicator);
                            } else {
                                potVisual.textContent = "Empty Pot (Mixed)";
                            }
                        } else {
                            // Pot is in the machine but not mixed yet
                            if (currentPot.ingredientIds && currentPot.ingredientIds.length > 0) {
                                // If not mixing, show ingredients individually
                                const ingredientsInPot = DOMHelper.createElement(
                                    "div",
                                    "ingredients-in-machine-pot"
                                );

                                currentPot.ingredientIds.forEach((ingredientId) => {
                                    const ingredientItem = ingredients.find(
                                        (i) => i.id === ingredientId
                                    );
                                    if (ingredientItem) {
                                        const ingredientChip = DOMHelper.createElement(
                                            "div",
                                            "ingredient-chip-in-machine"
                                        );
                                        ingredientChip.style.backgroundColor = ingredientItem.color;
                                        ingredientsInPot.append(ingredientChip);
                                    }
                                });

                                potVisual.append(ingredientsInPot);
                            } else {
                                potVisual.textContent = "Empty Pot";
                            }
                        }

                        // Add pot name label
                        const potName = DOMHelper.createElement("p", "pot-name");
                        potName.textContent = currentPot.name;
                        potVisual.append(potName);

                        mixingArea.append(potVisual);
                    }
                } else {
                    // No pot in the machine - show drop area
                    const dropZone = DOMHelper.createElement("div", "pot-drop-zone");
                    dropZone.textContent = "Drop Pot Here";
                    mixingArea.append(dropZone);
                }

                mixingArea.append(machineLid);

                // Add machine controls
                const controls = DOMHelper.createElement("div", "machine-controls");

                if (potId) {
                    if (isMixed) {
                        const collectButton = DOMHelper.createElement(
                            "button",
                            "collect-pot-button"
                        );
                        collectButton.textContent = "Collect Pot";
                        collectButton.dataset.machineId = machine.id;

                        const throwAwayButton = DOMHelper.createElement(
                            "button",
                            "remove-pot-button"
                        );
                        throwAwayButton.textContent = "Throw Away";
                        throwAwayButton.dataset.machineId = machine.id;

                        controls.append(collectButton, throwAwayButton);
                    } else {
                        // State 2: Has pot that is not mixed
                        const mixButton = DOMHelper.createElement("button", "mix-button");
                        mixButton.textContent = machine.isMixing ? "Mixing..." : "Start Mixing";
                        mixButton.disabled = machine.isMixing;
                        mixButton.dataset.machineId = machine.id;

                        const removePotButton = DOMHelper.createElement(
                            "button",
                            "remove-pot-button"
                        );
                        removePotButton.textContent = "Remove Pot";
                        removePotButton.disabled = machine.isMixing;
                        removePotButton.dataset.machineId = machine.id;

                        controls.append(mixButton, removePotButton);
                    }
                }

                // Delete button is always present
                const deleteButton = DOMHelper.createElement("button", "delete-btn");
                deleteButton.textContent = "Delete Machine";
                deleteButton.dataset.machineId = machine.id;
                deleteButton.disabled = machine.isMixing;

                controls.append(deleteButton);

                // Set up drop zone for pots
                mixingArea.addEventListener("dragover", this.handleDragOver);
                mixingArea.addEventListener("dragleave", this.handleDragLeave);
                mixingArea.addEventListener("drop", this.handleDrop.bind(this));

                // Remove the outputArea from the layout - we're handling everything in mixingArea now
                machineLayout.append(mixingArea, machineInfo);
                machineBody.append(machineLayout);
                machineCard.append(machineHeader, machineBody, controls);

                this.machinesList.append(machineCard);
            });
        }
    }

    handleDragStart(event) {
        const potCard = event.target.closest(".pot-card");
        if (potCard) {
            event.dataTransfer.setData("potId", potCard.dataset.id);
            event.dataTransfer.setData("potMixSpeed", potCard.dataset.mixSpeed);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        const mixingArea = event.target.closest(".mixing-area");
        if (mixingArea && !mixingArea.querySelector(".pot-in-machine")) {
            mixingArea.classList.add("drag-over");
        }
    }

    handleDragLeave(event) {
        event.preventDefault();
        const mixingArea = event.target.closest(".mixing-area");
        if (mixingArea) {
            mixingArea.classList.remove("drag-over");
        }
    }

    handleDrop(event) {
        event.preventDefault();
        const machineCard = event.target.closest(".machine-card");

        if (machineCard) {
            const mixingArea = event.target.closest(".mixing-area");

            if (mixingArea) {
                mixingArea.classList.remove("drag-over");

                const machineId = parseInt(mixingArea.dataset.machineId);

                // Check for regular pot data or saved pot data
                let potId = parseInt(event.dataTransfer.getData("potId"));
                let mixSpeed = parseInt(event.dataTransfer.getData("potMixSpeed"));

                // If not found, check for saved pot data by specific keys
                if (!potId) {
                    potId = parseInt(event.dataTransfer.getData("savedPotId"));
                    mixSpeed = parseInt(event.dataTransfer.getData("mixSpeed")) || 1;
                }

                if (machineId && potId && this.addPotHandler) {
                    this.addPotHandler(machineId, potId, mixSpeed);
                } else {
                    alert("Cannot add this to the machine.");
                }
            }
        }
    }

    bindCreateMachine(handler) {
        this.machineForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = this.machineNameInput.value.trim();
            const mixSpeed = this.machineMixSpeedInput.value;
            if (name && mixSpeed) {
                handler(name, mixSpeed, this.hallId);
                this.machineNameInput.value = "";
                this.machineMixSpeedInput.value = "1";
            }
        });
    }

    bindDeleteMachine(handler) {
        this.machinesList.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn" && !event.target.disabled) {
                const id = parseInt(event.target.dataset.machineId);
                handler(id);
            }
        });
    }

    bindStartMixing(handler) {
        this.machinesList.addEventListener("click", (event) => {
            if (event.target.classList.contains("mix-button") && !event.target.disabled) {
                const id = parseInt(event.target.dataset.machineId);
                handler(id);
            }
        });
    }

    bindDragDrop(addPotHandler, removePotHandler) {
        this.addPotHandler = addPotHandler;
        this.removePotHandler = removePotHandler;
        document.addEventListener("dragstart", this.handleDragStart);
    }

    bindRemovePot(handler) {
        this.machinesList.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-pot-button") && !event.target.disabled) {
                const machineId = parseInt(event.target.dataset.machineId);
                handler(machineId);
            }
        });
    }

    bindCollectPot(handler) {
        this.machinesList.addEventListener("click", (event) => {
            if (event.target.className === "collect-pot-button") {
                const id = parseInt(event.target.dataset.machineId);
                handler(id);
            }
        });
    }

    bindThrowAwayPot(handler) {
        this.machinesList.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-pot-button")) {
                const id = parseInt(event.target.dataset.machineId);
                handler(id);
            }
        });
    }

    updateMixingStatus(machineId, percentComplete) {
        const machineCard = DOMHelper.getElement(`.mixing-area[data-machine-id="${machineId}"]`);
        if (machineCard) {
            const progressBar = machineCard.querySelector(".progress-bar");
            if (progressBar) {
                progressBar.style.width = `${percentComplete}%`;
            }
        }
    }
}
