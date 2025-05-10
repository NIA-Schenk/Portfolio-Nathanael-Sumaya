class CollectedPotsController {
    constructor(collectedPotsModel, collectedPotsView, ingredientModel) {
        this.collectedPotsModel = collectedPotsModel;
        this.collectedPotsView = collectedPotsView;
        this.ingredientModel = ingredientModel;

        // Bind model event
        this.collectedPotsModel.bindCollectedPotsChanged(this.onCollectedPotsChanged.bind(this));

        // Bind view events
        this.collectedPotsView.bindDeleteCollectedPot(this.handleDeleteCollectedPot.bind(this));

        // Initial display
        this.onCollectedPotsChanged(this.collectedPotsModel.getAllCollectedPots());
    }

    // Callback when the collection changes
    onCollectedPotsChanged(collectedPots) {
        this.collectedPotsView.displayCollectedPots(
            collectedPots,
            this.ingredientModel.ingredients
        );
    }

    // Handler to delete a collected pot
    handleDeleteCollectedPot(id) {
        this.collectedPotsModel.deleteCollectedPot(id);
    }

    // Handler to add a pot to the collection
    handleCollectPot(pot, color) {
        // Create a copy of the pot with the mixed color
        const potToCollect = { ...pot };

        // Set the color if provided
        if (color) {
            potToCollect.color = color;
        }

        // Add to collection
        return this.collectedPotsModel.collectPot(potToCollect);
    }
}
