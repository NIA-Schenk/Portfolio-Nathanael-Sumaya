class IngredientController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindIngredientListChanged(this.onIngredientListChanged);
        this.view.bindcreateIngredient(this.handlecreateIngredient);
        this.view.bindDeleteIngredient(this.handleDeleteIngredient);

        this.onIngredientListChanged(this.model.ingredients);
    }

    onIngredientListChanged = (ingredients) => {
        this.view.displayIngredients(ingredients);
    };

    handlecreateIngredient = (name, mixTime, mixSpeed, color, texture) => {
        this.model.createIngredient(name, mixTime, mixSpeed, color, texture);
    };

    handleDeleteIngredient = (id) => {
        this.model.deleteIngredient(id);
    };
}
