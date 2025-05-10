class SavedPotsModel {
    constructor() {
        this.savedPots = JSON.parse(localStorage.getItem("savedPots")) || [];
        this.onsavedPotsChanged = null;
    }

    // Method to bind the event of collection change
    bindSavedPotsChanged(callback) {
        this.onsavedPotsChanged = callback;
    }

    // Save to local storage
    _commit() {
        localStorage.setItem("savedPots", JSON.stringify(this.savedPots));
        if (this.onsavedPotsChanged) {
            this.onsavedPotsChanged(this.savedPots);
        }
    }

    // Add a pot to the collection
    savePot(pot) {
        const SavedPot = {
            id: Date.now(),
            name: pot.name,
            color: pot.color || "#FFFFFF",
            ingredientIds: [...pot.ingredientIds],
            SavedAt: new Date().toISOString(),
            mixSpeed: pot.mixSpeed || 1,
            isMixed: false,
        };

        this.savedPots.push(SavedPot);
        this._commit();
        return SavedPot;
    }

    // Get all Saved pots
    getAllSavedPots() {
        return this.savedPots;
    }

    // Get a single Saved pot by ID
    getSavedPot(id) {
        return this.savedPots.find((pot) => pot.id === id);
    }

    // Delete a Saved pot
    deleteSavedPot(id) {
        this.savedPots = this.savedPots.filter((pot) => pot.id !== id);
        this._commit();
    }

    // Clear all Saved pots
    clearCollection() {
        this.savedPots = [];
        this._commit();
    }
}
