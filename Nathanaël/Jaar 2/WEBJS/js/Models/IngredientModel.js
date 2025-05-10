class IngredientModel {
    constructor() {
        this.ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
    }

    bindIngredientListChanged(callback) {
        this.onIngredientListChanged = callback;
    }

    _commit(ingredients) {
        this.onIngredientListChanged(ingredients);
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }

    createIngredient(name, mixTime, mixSpeed, color, texture) {
        const ingredient = {
            id:
                this.ingredients.length > 0
                    ? this.ingredients[this.ingredients.length - 1].id + 1
                    : 1,
            name,
            mixTime,
            mixSpeed,
            color,
            texture,
        };

        this.ingredients.push(ingredient);
        this._commit(this.ingredients);
    }

    deleteIngredient(id) {
        this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
        this._commit(this.ingredients);
    }
}
