class GridView {
    constructor() {
        this.gridSection = DOMHelper.getElement(".color-test-container");
        const heading = DOMHelper.createElement("h1");
        heading.textContent = "Color Tester";
        this.gridSection.prepend(heading);

        this.form = this.createForm();
        // Append the form to the DOM as needed
        const createButton = DOMHelper.createElement("button", "create-btn");
        createButton.textContent = "Generate grid";
        createButton.type = "button"; // prevent form submission
        createButton.onclick = () => this.generateGrid();
        this.form.append(createButton);

        const gridContainer = DOMHelper.createElement("div", "grid-container");
        gridContainer.id = "gridContainer";
        this.gridSection.append(this.form, gridContainer);
    }

    createForm() {
        const form = DOMHelper.createElement("form", "form-container");

        // Add form fields as needed
        const sizeContainer = DOMHelper.createElement("div", "input-container");
        const sizeLabel = DOMHelper.createElement("label");
        sizeLabel.textContent = "Grid size:";
        const sizeInput = DOMHelper.createElement("input");
        sizeInput.type = "number";
        sizeInput.min = "1";
        sizeInput.max = "10";
        sizeInput.name = "size";
        sizeInput.id = "size";
        sizeInput.required = true;
        sizeLabel.setAttribute("for", "size");
        sizeContainer.append(sizeLabel, sizeInput);
        sizeInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.generateGrid();
            }
        });

        const generateButton = DOMHelper.createElement("button", "generate-btn");
        generateButton.textContent = "Generate Grid";
        generateButton.type = "button";
        generateButton.addEventListener("click", () => this.generateGrid());
        form.append(sizeContainer);
        return form;
    }

    generateGrid() {
        const gridSize = document.getElementById("size").value;
        const gridContainer = document.getElementById("gridContainer");
        gridContainer.innerHTML = ""; // Clear the grid

        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
        gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 60px)`;
        gridContainer.style.display = "grid";
        gridContainer.style.justifyContent = "center";
        gridContainer.style.alignItems = "center";
        gridContainer.style.gap = "5px";

        for (let i = 0; i < gridSize * gridSize; i++) {
            const div = document.createElement("div");
            div.classList.add("gridItem");
            div.style.cursor = "pointer";
            div.style.border = "1px solid black";
            div.style.backgroundColor = "#fff";
            div.onclick = () => {
                this.showTriadicColorsPopup(div.style.backgroundColor);
            };
            gridContainer.appendChild(div);
            const divWidth = window.getComputedStyle(div).width;
            div.style.height = divWidth;
            div.addEventListener("dragover", (event) => {
                event.preventDefault(); // Required to allow a drop
            });
            div.addEventListener("drop", (event) => {
                event.preventDefault();

                // Get the currently dragged element
                const dragged = document.querySelector(".dragging");
                if (dragged && dragged.dataset.color) {
                    div.style.backgroundColor = dragged.dataset.color;
                }

                // Remove dragging class
                if (dragged) dragged.classList.remove("dragging");
            });
        }
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    showTriadicColorsPopup(color) {
        const popupContainer = DOMHelper.getElement("#customModal");
        const popup = DOMHelper.getElement("#triadicColorsPopup");
        const triadicColors = ColorUtils.calculateTriadicColors(color);

        const popupInnerHtml = `
			<div class="modal-header">
				<h3 class="popup-title">Triadic Colors</h3>
				<span class="close-btn" onclick="GridView.prototype.closePopup.call(this)">&times;</span>
			</div>
			<div class="modal-body">
				<div class="color-container">
					<div class="color-render" style="background-color: ${triadicColors.hex[0]}"></div>
					<span class="color-info"><b>Original Color: </b> ${triadicColors.hex[0].toUpperCase()} / ${triadicColors.rgb[0].toUpperCase()} / ${triadicColors.hsl[0].toUpperCase()}</span>
				</div>
				<div class="color-container">
					<div class="color-render" style="background-color: ${triadicColors.hex[1]}"></div>
					<span class="color-info"><b>Triadic Color 1:</b> ${triadicColors.hex[1].toUpperCase()} / ${triadicColors.rgb[1].toUpperCase()} / ${triadicColors.hsl[1].toUpperCase()}</span>
				</div>
				<div class="color-container">
					<div class="color-render" style="background-color: ${triadicColors.hex[2]}"></div>
					<span class="color-info"><b>Triadic Color 2:</b> ${triadicColors.hex[2].toUpperCase()} / ${triadicColors.rgb[2].toUpperCase()} / ${triadicColors.hsl[2].toUpperCase()}</span>
				</div>
			</div>
		`;
        popup.innerHTML = popupInnerHtml;
        popupContainer.style.display = "block";
        popup.style.display = "block";

        document.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Escape") {
                    this.closePopup();
                }
            },
            { once: true }
        ); // fires only once

        // Click outside to close
        popupContainer.addEventListener(
            "click",
            (event) => {
                if (event.target === popupContainer) {
                    this.closePopup();
                }
            },
            { once: true }
        ); // fires only once
    }

    closePopup() {
        const popupContainer = DOMHelper.getElement("#customModal");
        const popup = DOMHelper.getElement("#triadicColorsPopup");
        popupContainer.style.display = "none";
        popup.style.display = "none";
        popup.innerHTML = "";
    }
}
