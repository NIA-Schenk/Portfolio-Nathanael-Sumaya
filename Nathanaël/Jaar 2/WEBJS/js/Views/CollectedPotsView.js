class CollectedPotsView {
    constructor() {
        // Create the section for collected pots
        this.app = DOMHelper.getElement(".sidebar-drop-section");
        this.collectionSection = DOMHelper.createElement("section", "collection-section");

        // Title
        this.title = DOMHelper.createElement("h1");
        this.title.textContent = "Collected Mixed Pots";

        // Collection container
        this.collectionList = DOMHelper.createElement("div", "collection-list");
        this.collectionList.classList.add("scrollable");

        // Create empty message
        this.emptyMessage = DOMHelper.createElement("p", "empty-message");
        this.emptyMessage.textContent = "No mixed pots collected yet. Mix and collect some pots!";
        this.collectionList.append(this.emptyMessage);

        // Append everything to the section
        this.collectionSection.append(this.title, this.collectionList);

        // Append to app
        this.app.append(this.collectionSection);
    }

    // Display all collected pots
    displayCollectedPots(collectedPots, allIngredients) {
        // Clear the collection list
        while (this.collectionList.firstChild) {
            this.collectionList.removeChild(this.collectionList.firstChild);
        }

        if (collectedPots.length === 0) {
            this.collectionList.append(this.emptyMessage);
        } else {
            collectedPots.forEach((pot) => {
                const potCard = DOMHelper.createElement("div", "collected-pot-card");

                // Pot visual with mixed color
                const potVisual = DOMHelper.createElement("div", "collected-pot-visual");
                potVisual.draggable = true;
                if (pot.color) {
                    potVisual.style.backgroundColor = pot.color;
                } else if (pot.ingredientIds && pot.ingredientIds.length > 0) {
                    pot.color = ColorUtils.calculateBlendedColor(pot.ingredientIds, allIngredients);
                    potVisual.style.backgroundColor = pot.color;
                }
                potVisual.dataset.color = pot.color;

                potVisual.addEventListener("dragstart", (event) => {
                    event.target.dataset.color && event.target.classList.add("dragging");
                });

                // Set the background color based on the blended ingredients or saved color
                if (pot.color) {
                    potVisual.style.backgroundColor = pot.color;
                } else if (pot.ingredientIds && pot.ingredientIds.length > 0) {
                    const blendedColor = ColorUtils.calculateBlendedColor(
                        pot.ingredientIds,
                        allIngredients
                    );
                    potVisual.style.backgroundColor = blendedColor;
                }

                // Pot header
                const potHeader = DOMHelper.createElement("h3");
                potHeader.textContent = pot.name;

                potVisual.appendChild(potHeader);

                // Add delete button
                const deleteButton = DOMHelper.createElement("button", "delete-btn");
                deleteButton.textContent = "Remove";
                deleteButton.dataset.potId = pot.id;

                // Append everything to the pot card
                potCard.append(potVisual, deleteButton);
                this.collectionList.append(potCard);
            });
        }
    }

    // Event binding for deleting collected pots
    bindDeleteCollectedPot(handler) {
        this.collectionList.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = parseInt(event.target.dataset.potId);
                handler(id);
            }
        });
    }
}
