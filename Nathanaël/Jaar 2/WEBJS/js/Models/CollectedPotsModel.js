class CollectedPotsModel {
    constructor() {
        this.collectedPots = JSON.parse(localStorage.getItem("collectedPots")) || [];
        this.onCollectedPotsChanged = null;
    }

    // Method to bind the event of collection change
    bindCollectedPotsChanged(callback) {
        this.onCollectedPotsChanged = callback;
    }

    // Save to local storage
    _commit() {
        localStorage.setItem("collectedPots", JSON.stringify(this.collectedPots));
        if (this.onCollectedPotsChanged) {
            this.onCollectedPotsChanged(this.collectedPots);
        }
    }

    // Add a pot to the collection
    collectPot(pot) {
        // Create a new independent copy of the pot
        const collectedPot = {
            id: Date.now(), // Generate a new unique ID for the collected pot
            name: pot.name,
            color: pot.color || "#FFFFFF", // Default color if not provided
            ingredientIds: [...pot.ingredientIds], // Copy the array of ingredient IDs
            collectedAt: new Date().toISOString(),
            mixSpeed: pot.mixSpeed || 1,
            isMixed: true, // Mark as a mixed pot
        };

        this.collectedPots.push(collectedPot);
        this._commit();
        return collectedPot;
    }

    // Get all collected pots
    getAllCollectedPots() {
        return this.collectedPots;
    }

    // Get a single collected pot by ID
    getCollectedPot(id) {
        return this.collectedPots.find((pot) => pot.id === id);
    }

    // Delete a collected pot
    deleteCollectedPot(id) {
        this.collectedPots = this.collectedPots.filter((pot) => pot.id !== id);
        this._commit();
    }

    // Clear all collected pots
    clearCollection() {
        this.collectedPots = [];
        this._commit();
    }
}
