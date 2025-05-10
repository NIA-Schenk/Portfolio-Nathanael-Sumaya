class PotController {
    constructor(potModel, potView, ingredientModel, savedPotsController) {
        this.potModel = potModel;
        this.potView = potView;
        this.ingredientModel = ingredientModel;
        this.savedPotsController = savedPotsController;

        this.potModel.bindPotListChanged(this.onPotListChanged.bind(this));
        this.potView.bindCreatePot(this.handleCreatePot.bind(this));
        this.potView.bindDeletePot(this.handleDeletePot.bind(this));
        this.potView.bindAddIngredient(this.handleAddIngredient.bind(this));
        this.potView.bindRemoveIngredient(this.handleRemoveIngredient.bind(this));
        this.potView.bindDragDrop(
            this.handleAddIngredient.bind(this),
            this.handleRemoveIngredient.bind(this)
        );

        this.potView.bindSavePot(this.handleSavePot.bind(this));

        this.onPotListChanged(this.potModel.pots);
    }

    onPotListChanged(pots) {
        this.potView.displayPots(pots, this.ingredientModel.ingredients);
    }

    handleCreatePot(name) {
        this.potModel.createPot(name);
    }

    handleDeletePot(id) {
        this.potModel.deletePot(id);
    }

    handleAddIngredient(potId, ingredientId, ingredientMixSpeed) {
        if (this.potModel.canAddIngredient(potId, ingredientMixSpeed)) {
            this.potModel.addIngredientToPot(potId, ingredientId, ingredientMixSpeed);
        } else {
            alert("Cannot mix ingredients with different speeds!");
        }
    }

    handleRemoveIngredient(potId, ingredientId) {
        this.potModel.removeIngredientFromPot(potId, ingredientId);
    }

    handleSavePot(potId) {
        const pot = this.potModel.getPot(potId);
        if (pot && pot.ingredientIds && pot.ingredientIds.length > 0) {
            this.savedPotsController.handleSavePot(pot);
        } else {
            alert("Cannot save an empty pot. Add ingredients first!");
        }
    }
}
