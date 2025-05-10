class MixingMachineModel {
    constructor() {
        this.machines = JSON.parse(localStorage.getItem("mixingMachines")) || [];
    }

    bindMachineListChanged(callback) {
        this.onMachineListChanged = callback;
    }

    _commit() {
        this.onMachineListChanged(this.machines);
        localStorage.setItem("mixingMachines", JSON.stringify(this.machines));
    }

    createMachine(name, mixSpeed, hallId) {
        const machine = {
            id: this.generateUniqueId(),
            name,
            mixSpeed,
            hallId,
            potId: null,
            isMixing: false,
            mixStartTime: null,
            mixEndTime: null,
            created: new Date().toISOString(),
        };
        this.machines.push(machine);
        this._commit();
        return machine;
    }

    generateUniqueId() {
        const maxId = this.machines.reduce(
            (max, machine) => (machine.id > max ? machine.id : max),
            0
        );
        return maxId + 1;
    }

    deleteMachine(id) {
        this.machines = this.machines.filter((machine) => machine.id !== id);
        this._commit();
    }

    addPotToMachine(machineId, potId, potMixSpeed) {
        const machine = this.machines.find((machine) => machine.id === machineId);
        if (machine) {
            machine.potId = potId;
        }
        this._commit();
    }

    removePotFromMachine(machineId) {
        this.machines = this.machines.map((machine) => {
            if (machine.id === machineId) {
                machine.potId = null;
                machine.isMixing = false;
                machine.mixStartTime = null;
                machine.mixEndTime = null;
            }
            return machine;
        });
        this._commit();
    }

    startMixing(machineId, mixDuration) {
        const now = new Date();
        this.machines = this.machines.map((machine) => {
            if (machine.id === machineId && machine.potId && !machine.isMixing) {
                machine.isMixing = true;
                machine.mixStartTime = now.toISOString();

                // Calculate end time based on mix duration
                const endTime = new Date(now.getTime() + mixDuration);
                machine.mixEndTime = endTime.toISOString();
            }
            return machine;
        });
        this._commit();
        return this.getMachine(machineId);
    }

    // Add these methods to your MixingMachineModel class

    finishMixing(id) {
        const index = this.machines.findIndex((machine) => machine.id === id);
        if (index !== -1) {
            // Update the machine state to stop mixing
            this.machines[index].isMixing = false;
            this.machines[index].mixStartTime = null;
            this.machines[index].mixEndTime = null;

            this._commit();
            return this.machines[index];
        }
        return null;
    }

    setOutputPot(machineId, potId) {
        const index = this.machines.findIndex((machine) => machine.id === machineId);
        if (index !== -1) {
            // Set the output pot
            this.machines[index].potOutput = potId;
            this._commit();
            return this.machines[index];
        }
        return null;
    }

    removePotFromInput(machineId) {
        const index = this.machines.findIndex((machine) => machine.id === machineId);
        if (index !== -1) {
            // Clear the input pot
            this.machines[index].potId = null;
            this._commit();
            return this.machines[index];
        }
        return null;
    }

    removeOutputPot(machineId) {
        const index = this.machines.findIndex((machine) => machine.id === machineId);
        if (index !== -1) {
            // Clear the output pot
            this.machines[index].potOutput = null;
            this._commit();
            return this.machines[index];
        }
        return null;
    }

    getMachine(id) {
        return this.machines.find((machine) => machine.id === id);
    }

    getAllMachines() {
        return this.machines;
    }
}
