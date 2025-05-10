class SavedPotsView {
    constructor() {
        // Create the section for saved pots
        this.app = DOMHelper.getElement(".sidebar-drop-section");
        this.savedSection = DOMHelper.createElement("section", "saved-section");

        // Title
        this.title = DOMHelper.createElement("h1");
        this.title.textContent = "Saved Pots";

        // Collection container - change to match pots-list
        this.savedList = DOMHelper.createElement("div", "pots-list");
        this.savedList.classList.add("saved-list");
        this.savedList.classList.add("scrollable");

        // Create empty message
        this.emptyMessage = DOMHelper.createElement("p", "empty-message");
        this.emptyMessage.textContent = "No pots saved yet. Create and save some pots!";
        this.savedList.append(this.emptyMessage);

        // Append everything to the section
        this.savedSection.append(this.title, this.savedList);

        // Append to app
        this.app.append(this.savedSection);
    }

    // Display all saved pots
    displaySavedPots(savedPots, allIngredients) {
        while (this.savedList.firstChild) {
            this.savedList.removeChild(this.savedList.firstChild);
        }

        if (savedPots.length === 0) {
            this.savedList.append(this.emptyMessage);
        } else {
            savedPots.forEach((pot) => {
                const potCard = DOMHelper.createElement("div", "pot-card");
                potCard.draggable = true;
                potCard.dataset.id = pot.id; // Set the pot ID as data attribute
                potCard.dataset.mixSpeed = pot.mixSpeed || 1; // Set mix speed as data attribute

                const potVisual = DOMHelper.createElement("div", "pot-visual");

                const mixSpeedBadge = DOMHelper.createElement("div", "mix-speed-badge");
                mixSpeedBadge.textContent = `Mix speed: ${pot.mixSpeed || 1}`;
                potVisual.appendChild(mixSpeedBadge);

                const potHeader = DOMHelper.createElement("h3");
                potHeader.textContent = pot.name;
                potVisual.appendChild(potHeader);

                const ingredientsContainer = DOMHelper.createElement("div", "ingredients-in-pot");

                if (pot.ingredientIds && pot.ingredientIds.length > 0) {
                    pot.ingredientIds.forEach((ingredientId) => {
                        const ingredient = this.findIngredientById(ingredientId, allIngredients);
                        if (ingredient) {
                            const ingredientChip = DOMHelper.createElement(
                                "div",
                                "ingredient-chip"
                            );
                            ingredientChip.style.backgroundColor = ingredient.color;
                            ingredientChip.textContent = ingredient.name;
                            ingredientsContainer.appendChild(ingredientChip);
                        }
                    });
                } else {
                    potVisual.classList.add("empty-pot");
                    const emptyText = DOMHelper.createElement("span");
                    emptyText.textContent = "Empty Pot";
                    ingredientsContainer.appendChild(emptyText);
                }

                potVisual.appendChild(ingredientsContainer);

                // Add dragstart event listener for entire card
                potCard.addEventListener("dragstart", (event) => {
                    // Set all required data for transferring - ensure consistent key names
                    event.dataTransfer.setData("savedPotId", pot.id);
                    event.dataTransfer.setData("potId", pot.id);
                    event.dataTransfer.setData("mixSpeed", pot.mixSpeed || 1);
                    event.dataTransfer.setData("potMixSpeed", pot.mixSpeed || 1);
                    event.target.classList.add("dragging");
                });

                potCard.addEventListener("dragend", (event) => {
                    event.target.classList.remove("dragging");
                });

                // Add delete button
                const deleteButton = DOMHelper.createElement("button", "delete-btn");
                deleteButton.textContent = "Remove";
                deleteButton.dataset.potId = pot.id;

                // Append everything to the pot card
                potCard.append(potVisual, deleteButton);
                this.savedList.append(potCard);
            });
        }
    }

    // Helper to find ingredient by ID
    findIngredientById(id, ingredients) {
        return ingredients.find((ingredient) => ingredient.id === id);
    }

    // Event binding for deleting saved pots
    bindDeleteSavedPot(handler) {
        this.savedList.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = parseInt(event.target.dataset.potId);
                handler(id);
            }
        });
    }
}
