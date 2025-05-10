class PotModel {
    constructor() {
        this.pots = JSON.parse(localStorage.getItem("pots")) || [];
    }

    bindPotListChanged(callback) {
        this.onPotListChanged = callback;
    }

    _commit() {
        this.onPotListChanged(this.pots);
        localStorage.setItem("pots", JSON.stringify(this.pots));
    }

    createPot(name) {
        const pot = {
            id: this.pots.length > 0 ? this.pots[this.pots.length - 1].id + 1 : 1,
            name,
            ingredientIds: [],
            mixSpeed: null,
            created: new Date().toISOString(),
        };

        this.pots.push(pot);
        this._commit();
    }

    deletePot(id) {
        this.pots = this.pots.filter((pot) => pot.id !== id);
        this._commit();
    }

    addIngredientToPot(potId, ingredientId, mixSpeed) {
        const pot = this.pots.find((pot) => pot.id === potId);

        if (pot) {
            if (pot.ingredientIds.length === 0) {
                pot.mixSpeed = mixSpeed;
            }

            if (pot.mixSpeed === mixSpeed) {
                pot.ingredientIds.push(ingredientId);
            }

            this._commit();
        } else {
            console.warn("Pot not found with ID:", potId);
        }
    }

    removeIngredientFromPot(potId, ingredientId) {
        const pot = this.pots.find((pot) => pot.id === potId);

        if (pot) {
            const index = pot.ingredientIds.indexOf(ingredientId);
            if (index !== -1) {
                pot.ingredientIds.splice(index, 1);

                if (pot.ingredientIds.length === 0) {
                    pot.mixSpeed = null;
                }

                this._commit();
            }
        } else {
            console.warn("Pot not found with ID:", potId);
        }
    }

    getAllPots() {
        return this.pots;
    }

    getPot(id) {
        return this.pots.find((pot) => pot.id === id);
    }

    canAddIngredient(potId, mixSpeed) {
        const pot = this.pots.find((pot) => pot.id === potId);
        return !pot || pot.ingredientIds.length === 0 || pot.mixSpeed === mixSpeed;
    }
}
