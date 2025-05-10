class IngredientView {
    constructor() {
        this.app = DOMHelper.getElement(".ingredient-section");
        this.colorFormat = "rgb";

        this.title = DOMHelper.createElement("h1");
        this.title.textContent = "Ingredient Creator";

        const colorFormatContainer = DOMHelper.createElement("div", "colortype-container");

        this.formatSelector = DOMHelper.createElement("select");
        this.formatSelector.id = "colorFormatSelect";

        ["RGB", "HSL", "HEX"].forEach((format) => {
            const button = DOMHelper.createElement("button", "colortypelink");
            button.textContent = format;
            if (format === "RGB") {
                button.classList.add("active");
            }
            button.addEventListener("click", (event) => {
                this.setActiveColor(event, format.toLowerCase());
            });
            colorFormatContainer.append(button);
        });

        this.formatSelector.addEventListener("change", () => {
            this.colorFormat = this.formatSelector.value;
            this.updateIngredientsColorDisplay();
        });

        this.ingredientForm = this.createForm();

        // Ingredients list
        this.ingredientsList = DOMHelper.createElement("div", "ingredients-list");

        // Append everything to the app
        this.app.append(
            this.title,
            colorFormatContainer,
            this.ingredientForm,
            this.ingredientsList
        );
    }

    setActiveColor(event, format) {
        this.colorFormat = format;
        this.updateIngredientsColorDisplay();

        const tablinks = document.getElementsByClassName("colortypelink");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        event.currentTarget.classList.add("active");
    }

    createForm() {
        const form = DOMHelper.createElement("form", "form-container");

        const nameContainer = DOMHelper.createElement("div", "input-container");
        const nameLabel = DOMHelper.createElement("label");
        nameLabel.textContent = "Name:";
        this.nameInput = DOMHelper.createElement("input");
        this.nameInput.type = "text";
        this.nameInput.placeholder = "Enter ingredient name";
        this.nameInput.name = "name";
        this.nameInput.id = "name";
        this.nameInput.required = true;
        nameLabel.setAttribute("for", "name");
        nameContainer.append(nameLabel, this.nameInput);

        const mixTimeContainer = DOMHelper.createElement("div", "input-container");
        const mixTimeLabel = DOMHelper.createElement("label");
        mixTimeLabel.textContent = "Mix Time (ms):";
        this.mixTimeInput = DOMHelper.createElement("input");
        this.mixTimeInput.type = "number";
        this.mixTimeInput.min = "100";
        this.mixTimeInput.value = "1000";
        this.mixTimeInput.name = "mixTime";
        this.mixTimeInput.id = "mixTime";
        this.mixTimeInput.required = true;
        mixTimeLabel.setAttribute("for", "mixTime");
        mixTimeContainer.append(mixTimeLabel, this.mixTimeInput);

        const mixSpeedContainer = DOMHelper.createElement("div", "input-container");
        const mixSpeedLabel = DOMHelper.createElement("label");
        mixSpeedLabel.textContent = "Mix Speed (1-10):";
        this.mixSpeedInput = DOMHelper.createElement("input");
        this.mixSpeedInput.type = "number";
        this.mixSpeedInput.min = "1";
        this.mixSpeedInput.max = "10";
        this.mixSpeedInput.value = "1";
        this.mixSpeedInput.id = "mixSpeed";
        mixSpeedLabel.setAttribute("for", "mixSpeed");
        mixSpeedContainer.append(mixSpeedLabel, this.mixSpeedInput);

        // Enhanced color container with format switch and copy button
        const colorContainer = DOMHelper.createElement("div", "input-container");
        const colorLabel = DOMHelper.createElement("label");
        colorLabel.textContent = "Color:";

        this.colorInput = DOMHelper.createElement("input");
        this.colorInput.type = "color";
        this.colorInput.value = "#FFFFFF";
        this.colorInput.name = "color";
        this.colorInput.id = "color";
        colorLabel.setAttribute("for", "color");

        colorContainer.append(colorLabel, this.colorInput);

        const textureContainer = DOMHelper.createElement("div", "input-container");
        const textureLabel = DOMHelper.createElement("label");
        textureLabel.textContent = "Texture:";
        this.textureSelect = DOMHelper.createElement("select");
        this.textureSelect.name = "texture";

        const textures = ["Grain", "Coarse Grain", "Smooth", "Slimy"];
        textures.forEach((texture) => {
            const option = DOMHelper.createElement("option");
            option.value = texture.toLowerCase().replace(" ", "-");
            option.textContent = texture;
            this.textureSelect.append(option);
        });
        textureContainer.append(textureLabel, this.textureSelect);

        this.createIngredientButton = DOMHelper.createElement("button", "create-btn");
        this.createIngredientButton.textContent = "Create Ingredient";

        form.append(
            nameContainer,
            mixTimeContainer,
            mixSpeedContainer,
            colorContainer,
            textureContainer,
            this.createIngredientButton
        );

        return form;
    }

    updateIngredientsColorDisplay() {
        const colorDetails = document.querySelectorAll(".info-item[data-color-hex]");

        colorDetails.forEach((colorDetail) => {
            const colorHex = colorDetail.getAttribute("data-color-hex");

            if (colorHex) {
                const valueElement = colorDetail.querySelector(".info-value");
                if (valueElement) {
                    valueElement.textContent = ColorUtils.convertColorFormat(
                        colorHex,
                        this.colorFormat
                    ).toUpperCase();
                }
            }
        });
    }

    displayIngredients(ingredients) {
        this.ingredientsList.innerHTML = "";

        if (ingredients.length === 0) {
            this.emptyMessage = DOMHelper.createElement("p", "empty-message");
            this.emptyMessage.textContent = "No ingredients created yet. Make one!";
            this.ingredientsList.append(this.emptyMessage);
        } else {
            ingredients.forEach((ingredient) => {
                const ingredientCard = DOMHelper.createElement("div", "ingredient-card");
                ingredientCard.dataset.id = ingredient.id;
                ingredientCard.dataset.mixSpeed = ingredient.mixSpeed;
                ingredientCard.draggable = true;
                ingredientCard.style.userSelect = "none";

                const ingredientHeader = DOMHelper.createElement("h3");
                ingredientHeader.textContent = ingredient.name;

                const ingredientVisual = DOMHelper.createElement("div", "visual-container");
                const visual = this.createVisualIngredient(ingredient);
                ingredientVisual.append(visual);

                const info = DOMHelper.createElement("div", "info-container");

                const mixTimeDetail = DOMHelper.createElement("p", "info-item");
                const mixTimeLabel = DOMHelper.createElement("span", "info-label");
                mixTimeLabel.textContent = "Mix Time: ";
                const mixTimeValue = DOMHelper.createElement("span", "info-value");
                mixTimeValue.textContent = `${ingredient.mixTime}ms`;
                mixTimeDetail.append(mixTimeLabel, mixTimeValue);

                const mixSpeedDetail = DOMHelper.createElement("p", "info-item");
                const mixSpeedLabel = DOMHelper.createElement("span", "info-label");
                mixSpeedLabel.textContent = "Mix Speed: ";
                const mixSpeedValue = DOMHelper.createElement("span", "info-value");
                mixSpeedValue.textContent = `${ingredient.mixSpeed}/10`;
                mixSpeedDetail.append(mixSpeedLabel, mixSpeedValue);

                const colorDetail = DOMHelper.createElement("p", "info-item");
                colorDetail.setAttribute("data-color-hex", ingredient.color);
                const colorLabel = DOMHelper.createElement("span", "info-label");
                colorLabel.textContent = "Color: ";
                const colorValue = DOMHelper.createElement("span", "info-value");
                colorValue.textContent = ColorUtils.convertColorFormat(
                    ingredient.color,
                    this.colorFormat
                ).toUpperCase();
                colorDetail.append(colorLabel, colorValue);

                const textureDetail = DOMHelper.createElement("p", "info-item");
                const textureLabel = DOMHelper.createElement("span", "info-label");
                textureLabel.textContent = "Texture: ";
                const textureValue = DOMHelper.createElement("span", "info-value");
                textureValue.textContent = ingredient.texture.replace("-", " ");
                textureDetail.append(textureLabel, textureValue);

                info.append(mixTimeDetail, mixSpeedDetail, colorDetail, textureDetail);

                const deleteButton = DOMHelper.createElement("button", "delete-btn");
                deleteButton.textContent = "Delete";
                deleteButton.dataset.id = ingredient.id;

                // Append all sections to ingredient card
                ingredientCard.append(ingredientHeader, ingredientVisual, info, deleteButton);
                this.ingredientsList.append(ingredientCard);
            });
        }
    }

    createVisualIngredient(ingredient) {
        const visual = DOMHelper.createElement("div", "ingredient-visual");

        visual.style.backgroundColor = ingredient.color;
        visual.style.width = "100px";
        visual.style.height = "100px";

        switch (ingredient.texture) {
            case "grain":
                visual.classList.add("grain-texture");
                for (let i = 0; i < 250; i++) {
                    const grain = DOMHelper.createElement("div", "grain");
                    grain.style.left = `${Math.random() * 100}px`;
                    grain.style.top = `${Math.random() * 100}px`;
                    grain.style.backgroundColor = ColorUtils.adjustColor(ingredient.color, -20);
                    visual.append(grain);
                }
                break;

            case "coarse-grain":
                visual.classList.add("coarse-grain-texture");
                for (let i = 0; i < 50; i++) {
                    const coarseGrain = DOMHelper.createElement("div", "coarse-grain");
                    coarseGrain.style.left = `${Math.random() * 100}px`;
                    coarseGrain.style.top = `${Math.random() * 100}px`;
                    coarseGrain.style.backgroundColor = ColorUtils.adjustColor(
                        ingredient.color,
                        -10
                    );
                    visual.append(coarseGrain);
                }
                break;

            case "smooth":
                const lightColor = ColorUtils.adjustColor(ingredient.color, 60);
                const darkColor = ColorUtils.adjustColor(ingredient.color, -30);

                visual.classList.add("smooth");
                visual.style.setProperty("--ingredient-color", ingredient.color);
                visual.style.setProperty("--light-color", lightColor);
                visual.style.setProperty("--dark-color", darkColor);
                break;

            case "slimy":
                visual.classList.add("slimy-texture");
                break;
        }
        return visual;
    }

    // Bindings for event handlers
    bindcreateIngredient(handler) {
        this.ingredientForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const values = this.getIngredientValues();

            if (values.name) {
                handler(values.name, values.mixTime, values.mixSpeed, values.color, values.texture);
                this.nameInput.value = "";
            }
        });
    }

    bindDeleteIngredient(handler) {
        this.ingredientsList.addEventListener("click", (event) => {
            if (event.target.className === "delete-btn") {
                const id = parseInt(event.target.dataset.id);
                handler(id);
            }
        });
    }

    getIngredientValues() {
        return {
            name: this.nameInput.value,
            mixTime: parseInt(this.mixTimeInput.value),
            mixSpeed: parseInt(this.mixSpeedInput.value),
            color: this.colorInput.value,
            texture: this.textureSelect.value,
        };
    }
}
