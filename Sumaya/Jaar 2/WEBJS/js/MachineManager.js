class MachineManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.counter = 0;
        this.machines = [];
    }

    addMachine() {
        this.counter++;
        const id = this.counter;
        const minTime = this.getRandomInt(5000, 10000); // in ms
        const mixSpeed = this.getRandomInt(5000, 10000); // in ms
        const machine = new Machine(id, minTime, mixSpeed);
        this.machines.push(machine);
        this.container.appendChild(machine.element);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createMachine(minTime, mixSpeed, hall) {
        const containerId = `machines-${hall}`;
        const container = document.getElementById(containerId);
    
        if (!container) {
            console.error(`Container voor hall "${hall}" niet gevonden.`);
            return;
        }
    
        this.counter++;
        const id = this.counter;
        const machine = new Machine(id, minTime, mixSpeed);
        this.machines.push(machine);
        container.appendChild(machine.element);
    }    
}

function closeMachineInfoPopup() {
    document.getElementById("machineInfoPopup").style.display = "none";
}
