class PotView {
    constructor() {
        this.app = DOMHelper.getElement(".pot-section");

        this.title = DOMHelper.createElement("h1");
        this.title.textContent = "Mixing Pots";

        this.potForm = this.createForm();

        this.potsList = DOMHelper.createElement("div", "pots-list");

        // Append everything to the app
        this.app.append(this.title, this.potForm, this.potsList);

        this.setupDragAndDrop();
    }

    createForm() {
        const form = DOMHelper.createElement("form", "form-container");

        const nameContainer = DOMHelper.createElement("div", "input-container");
        const nameLabel = DOMHelper.createElement("label");
        nameLabel.textContent = "Pot Name:";
        this.potNameInput = DOMHelper.createElement("input");
        this.potNameInput.type = "text";
        this.potNameInput.placeholder = "Enter pot name";
        this.potNameInput.name = "potName";
        this.potNameInput.id = "potName";
        this.potNameInput.required = true;
        nameLabel.setAttribute("for", "potName");
        nameContainer.append(nameLabel, this.potNameInput);

        this.createPotButton = DOMHelper.createElement("button", "create-btn");
        this.createPotButton.textContent = "Create Pot";

        form.append(nameContainer, this.createPotButton);

        return form;
    }

    displayPots(pots, ingredients) {
        while (this.potsList.firstChild) {
            this.potsList.removeChild(this.potsList.firstChild);
        }

        if (pots.length === 0) {
            this.emptyMessage = DOMHelper.createElement("p", "empty-message");
            this.emptyMessage.textContent = "No pots created yet. Make one!";
            this.potsList.append(this.emptyMessage);
            return;
        }

        pots.forEach((pot) => {
            const potCard = DOMHelper.createElement("div", "pot-card");
            potCard.dataset.id = pot.id;
            potCard.dataset.mixSpeed = pot.mixSpeed;
            // potCard.draggable = true;
            potCard.style.userSelect = "none";

            const potHeader = DOMHelper.createElement("h3");
            potHeader.textContent = pot.name;

            const potVisual = DOMHelper.createElement("div", "pot-visual");

            if (pot.mixSpeed !== null) {
                const mixSpeedBadge = DOMHelper.createElement("div", "mix-speed-badge");
                mixSpeedBadge.textContent = `Mix Speed: ${pot.mixSpeed}`;
                potVisual.append(mixSpeedBadge);
            }

            // Make pot a drop target
            potVisual.addEventListener("dragover", this.handleDragOver.bind(this));
            potVisual.addEventListener("dragleave", this.handleDragLeave.bind(this));
            potVisual.addEventListener("drop", this.handleDrop.bind(this));

            if (pot.ingredientIds && pot.ingredientIds.length > 0) {
                const ingredientsInPot = DOMHelper.createElement("div", "ingredients-in-pot");

                pot.ingredientIds.forEach((ingredientId) => {
                    const ingredientItem = this.findIngredientById(ingredientId, ingredients);
                    if (ingredientItem) {
                        const ingredientChip = DOMHelper.createElement("div", "ingredient-chip");
                        ingredientChip.dataset.ingredientId = ingredientId;
                        ingredientChip.dataset.potId = pot.id;
                        ingredientChip.style.backgroundColor = ingredientItem.color;
                        ingredientChip.textContent = ingredientItem.name;

                        // Use a click handler to remove ingredients
                        ingredientChip.addEventListener("click", (e) => {
                            e.stopPropagation();
                            if (this.removeIngredientHandler) {
                                this.removeIngredientHandler(pot.id, ingredientId);
                            }
                        });

                        ingredientsInPot.append(ingredientChip);
                    }
                });

                potVisual.append(ingredientsInPot);
            } else {
                potVisual.classList.add("empty-pot");
                const emptyText = DOMHelper.createElement("p", "empty-text");
                emptyText.textContent = "Drag ingredients here";
                potVisual.append(emptyText);
            }

            const potInfo = DOMHelper.createElement("div", "pot-info");

            const createdDate = new Date(pot.created);
            const dateInfo = DOMHelper.createElement("p");
            dateInfo.textContent = `Created: ${createdDate.toLocaleDateString()}`;
            const ingredientCount = DOMHelper.createElement("p");
            ingredientCount.textContent = `Ingredients: ${
                pot.ingredientIds ? pot.ingredientIds.length : 0
            }`;

            potInfo.append(dateInfo, ingredientCount);

            // Buttons container for better layout
            const buttonContainer = DOMHelper.createElement("div", "button-container");

            // Add Save button - new functionality
            const saveButton = DOMHelper.createElement("button", "collect-pot-button");
            saveButton.textContent = "Save";
            saveButton.dataset.potId = pot.id;
            saveButton.title = "Save pot for later use in mixing machines";

            const deleteButton = DOMHelper.createElement("button", "delete-btn");
            deleteButton.textContent = "Delete";
            deleteButton.dataset.potId = pot.id;

            // Add buttons to container
            buttonContainer.append(saveButton, deleteButton);

            // Append all sections to pot card
            potCard.append(potHeader, potVisual, potInfo, buttonContainer);
            this.potsList.append(potCard);
        });
    }

    calculateBlendedColor(ingredientIds, allIngredients) {
        return ColorUtils.calculateBlendedColor(ingredientIds, allIngredients);
    }

    findIngredientById(id, ingredients) {
        return ColorUtils.findIngredientById(id, ingredients);
    }

    setupDragAndDrop() {
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDragStart(event) {
        const ingredientCard = event.target.closest(".ingredient-card");
        if (ingredientCard) {
            event.dataTransfer.setData("ingredientId", ingredientCard.dataset.id);
            event.dataTransfer.setData("ingredientMixSpeed", ingredientCard.dataset.mixSpeed);
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        const potVisual = event.target.closest(".pot-visual");
        if (potVisual) {
            potVisual.classList.add("drag-over");
        }
    }

    handleDragLeave(event) {
        event.preventDefault();
        const potVisual = event.target.closest(".pot-visual");
        if (potVisual) {
            potVisual.classList.remove("drag-over");
        }
    }

    handleDrop(event) {
        event.preventDefault();
        const potCard = event.target.closest(".pot-card");

        if (potCard) {
            const potVisual = event.target.closest(".pot-visual");

            if (potVisual) {
                potVisual.classList.remove("drag-over");

                const potId = parseInt(potCard.dataset.id);
                const ingredientMixSpeed = parseInt(
                    event.dataTransfer.getData("ingredientMixSpeed")
                );
                const ingredientId = parseInt(event.dataTransfer.getData("ingredientId"));

                if (potId && ingredientId && ingredientMixSpeed && this.addIngredientHandler) {
                    this.addIngredientHandler(potId, ingredientId, ingredientMixSpeed);
                } else {
                    alert("Cannot add this to the pot.");
                }
            }
        }
    }

    bindCreatePot(handler) {
        this.potForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = this.potNameInput.value.trim();
            if (name) {
                handler(name);
                this.potNameInput.value = "";
            }
        });
    }

    bindSavePot(handler) {
        this.potsList.addEventListener("click", (event) => {
            if (event.target.className === "collect-pot-button") {
                const id = parseInt(event.target.dataset.potId);
                handler(id);
            }
        });
    }

    bindCollectPot(handler) {
        this.potsList.addEventListener("click", (event) => {
            if (event.target.className === "collect-pot-btn") {
                const id = parseInt(event.target.dataset.potId);
                handler(id);
            }
        });
    }

    bindDeletePot(handler) {
        this.potsList.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = parseInt(event.target.dataset.potId);
                handler(id);
            }
        });
    }

    bindDragDrop(addIngredientHandler, removeIngredientHandler) {
        this.addIngredientHandler = addIngredientHandler;
        this.removeIngredientHandler = removeIngredientHandler;

        // Set up global listener for ingredient cards
        document.addEventListener("dragstart", this.handleDragStart);
    }

    bindAddIngredient(handler) {
        this.addIngredientHandler = handler;
    }

    bindRemoveIngredient(handler) {
        this.removeIngredientHandler = handler;
    }
}
