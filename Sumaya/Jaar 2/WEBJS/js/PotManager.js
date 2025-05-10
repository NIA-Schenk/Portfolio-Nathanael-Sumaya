class PotManager {
    constructor() {
        this.potCounter = 0;
        this.pots = {};
    }

    addPot() {
        this.potCounter++;
        const newPot = new Pot(this.potCounter);
        this.pots[this.potCounter] = newPot;

        newPot.appendTo(document.getElementById("potsContainer"));
    }
}
