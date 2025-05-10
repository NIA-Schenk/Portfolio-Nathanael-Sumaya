class SavedPotsController {
    constructor(savedPotsModel, savedPotsView, ingredientModel) {
        this.savedPotsModel = savedPotsModel;
        this.savedPotsView = savedPotsView;
        this.ingredientModel = ingredientModel;

        // Bind model event
        this.savedPotsModel.bindSavedPotsChanged(this.onSavedPotsChanged.bind(this));

        // Bind view events
        this.savedPotsView.bindDeleteSavedPot(this.handleDeleteSavedPot.bind(this));

        // Initial display
        this.onSavedPotsChanged(this.savedPotsModel.getAllSavedPots());
    }

    // Callback when the saved pots collection changes
    onSavedPotsChanged(savedPots) {
        this.savedPotsView.displaySavedPots(savedPots, this.ingredientModel.ingredients);
    }

    // Handler to delete a saved pot
    handleDeleteSavedPot(id) {
        this.savedPotsModel.deleteSavedPot(id);
    }

    // Handler to save a pot
    handleSavePot(pot) {
        this.savedPotsModel.savePot(pot);
    }
}
