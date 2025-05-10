class Machine {
    constructor(id, minTime, mixSpeed) {
        this.id = id;
        this.minTime = minTime;
        this.mixSpeed = mixSpeed;
        this.element = this.createMachineElement();
    }

    createMachine(minTime, mixSpeed) {
        this.counter++;
        const id = this.counter;
        const machine = new Machine(id, parseInt(minTime), parseInt(mixSpeed));
        this.machines.push(machine);
        this.container.appendChild(machine.element);
    }

    createMachineElement() {
        const machine = document.createElement("div");
        machine.className = "Machine";
        machine.id = `machine-${this.id}`;

        const content = this.createContentElement();
        machine.appendChild(content);

        const mixButton = this.createMixButton();
        machine.appendChild(mixButton);

        machine.onclick = (e) => this.handleMachineClick(e, mixButton);

        return machine;
    }

    createContentElement() {
        const content = document.createElement("div");
        content.className = "machine-content dropzone";
        content.ondragover = this.preventDefaultAction;
        content.ondrop = this.handleDrop.bind(this);
        return content;
    }

    createMixButton() {
        const mixButton = document.createElement("button");
        mixButton.textContent = "Mix de verf";
        mixButton.className = "mix-button";
        mixButton.onclick = () => this.handleMixingAction(mixButton);
        return mixButton;
    }

    handleMachineClick(e, mixButton) {
        if (e.target !== mixButton) {
            this.showInfo();
        }
    }

    preventDefaultAction(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();
        const potId = e.dataTransfer.getData("text/plain");
        const dragged = document.getElementById(potId);

        if (this.isValidDraggedElement(dragged)) {
            this.appendDraggedElement(e, dragged);
        }
    }

    isValidDraggedElement(dragged) {
        return dragged && dragged.classList.contains("Pot");
    }

    appendDraggedElement(e, dragged) {
        e.currentTarget.appendChild(dragged);
        dragged.style.transform = "scale(0.9)";
        dragged.style.margin = "4px 0";
    }

    handleMixingAction(button) {
        const content = button.parentElement.querySelector('.machine-content');
        const pot = content.querySelector(".Pot");
        if (!pot) return;

        const ingredients = this.getIngredientsInPot(pot);
        if (ingredients.length === 0) {
            return;
        }

        const { mixedColor, maxTime } = this.calculateMixture(pot);

        this.startMixingAnimation(pot, button);

        setTimeout(() => {
            this.applyMixedColor(pot, mixedColor);

            this.stopMixingAnimation(pot, button);

            this.removeDropzone(content);

            this.clearIngredients(ingredients);

        }, maxTime);
    }

    getIngredientsInPot(pot) {
        const ingredients = pot.querySelectorAll(".Ingredient");
        return ingredients;
    }

    calculateMixture(pot) {
        let totalR = 0, totalG = 0, totalB = 0, count = 0, maxTime = 0;

        const ingredients = this.getIngredientsInPot(pot);

        ingredients.forEach((ingredientElement) => {
            const [r, g, b] = ingredientElement.dataset.color.split(',').map(Number);
            const minTime = parseInt(ingredientElement.dataset.minTime);

            totalR += r;
            totalG += g;
            totalB += b;

            maxTime = Math.max(maxTime, minTime);

            count++;
        });

        if (count === 0) return { mixedColor: null, maxTime: 0 };

        const mixedColor = `rgb(${Math.floor(totalR / count)}, ${Math.floor(totalG / count)}, ${Math.floor(totalB / count)})`;
        
        this.saveMixedColors(mixedColor);

        return { mixedColor, maxTime };
    }

    saveMixedColors(mixedColor) {
        let colors = JSON.parse(localStorage.getItem("mixedColors")) || [];
    
        colors.push(mixedColor);
    
        localStorage.setItem("mixedColors", JSON.stringify(colors));
    }
    

    startMixingAnimation(pot, button) {
        pot.classList.add("shaking");
        button.disabled = true;
        button.textContent = "Mengen...";
    }

    stopMixingAnimation(pot, button) {
        pot.classList.remove("shaking");
        button.disabled = false;
        button.textContent = "Mix de verf";
    }

    applyMixedColor(pot, color) {
        if (color) {
            pot.style.backgroundColor = color;
            pot.style.transition = "background-color 0.5s ease";
        }
    }

    clearIngredients(ingredients) {
        ingredients.forEach(i => i.remove());
    }

    resetMixingUI(button) {
        button.disabled = false;
        button.textContent = "Mix de verf";
    }

    showInfo() {
        const infoText = this.getMachineInfoText();
        document.getElementById("machineInfoText").innerHTML = infoText;
        document.getElementById("machineInfoPopup").style.display = "block";
    }

    getMachineInfoText() {
        return `
            <strong>Id:</strong> ${this.id}<br>
            <strong>Minimale mengtijd:</strong> ${this.minTime} ms<br>
            <strong>Mengsnelheid:</strong> ${this.mixSpeed}<br>
        `;
    }

    removeDropzone(content) {
        const dropzone = content.querySelector('.dropzone');
        if (dropzone) {
            dropzone.remove();
        }
    }
}
