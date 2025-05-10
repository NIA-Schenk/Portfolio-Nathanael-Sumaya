class IngredientManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.ingredientCounter = 0;
        this.ingredients = {}; 
        this.ingredientList = []; 
        this.shapes = ["circle", "square", "triangle", "blob", "circle"];
        this.textures = ["grain", "coarse-grain", "smooth", "slimy"];
    }

    addIngredient() {
        const id = ++this.ingredientCounter;
        const texture = this.randomTexture();
        const shape = this.getShapeFromTexture(texture); 
        const color = this.generateRandomColor();
        const minTime = this.randomInRange(5000, 10000); // in ms
        const mixSpeed = this.randomInRange(5000, 10000); // in ms 

        const ingredient = new Ingredient(id, shape, texture, color, minTime, mixSpeed);
        this.ingredients[id] = ingredient;  
        
        console.log("Ingrediënten in ingredientManager na toevoegen:", this.ingredients);


        this.ingredientList.push(ingredient); 
        this.container.appendChild(ingredient.element);
    }

    addCustomIngredientFromForm() {
        const minTimeInput = document.getElementById("createIngredientFormMinTime");
        const mixSpeedInput = document.getElementById("createIngredientFormMixSpeed");
        const colorInput = document.getElementById("createIngredientFormColor");
        const textureSelect = document.getElementById("createIngredientFormTexture");
    
        const minTime = parseInt(minTimeInput.value);
        const mixSpeed = parseInt(mixSpeedInput.value);
        const colorHex = colorInput.value; // e.g. "#ff0000"
        const textureLabel = textureSelect.value;
    
        if (isNaN(minTime) || isNaN(mixSpeed) || !colorHex) {
            alert("Vul alle velden correct in.");
            return;
        }
    
        const id = ++this.ingredientCounter;
        const texture = this.mapTextureLabelToValue(textureLabel);
        const shape = this.getShapeFromTexture(texture);
        const color = this.hexToRgbArray(colorHex);
    
        const ingredient = new Ingredient(id, shape, texture, color, minTime, mixSpeed);
        this.ingredients[id] = ingredient;
        this.container.appendChild(ingredient.element);
    
        // Form resetten & sluiten
        minTimeInput.value = "";
        mixSpeedInput.value = "";
        colorInput.value = "#000000";
        document.getElementById("ingredientForm").style.display = "none";
    }
    
    mapTextureLabelToValue(label) {
        switch (label) {
            case "korrel": return "grain";
            case "grove-korrel": return "coarse-grain";
            case "glad": return "smooth";
            case "slijmerig": return "slimy";
            default: return "grain";
        }
    }
    
    hexToRgbArray(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }     

    getIngredientById(id) {
        return this.ingredients[id];
    }

    randomShape() {
        return this.shapes[this.ingredientCounter % this.shapes.length];
    }

    randomTexture() {
        return this.textures[Math.floor(Math.random() * this.textures.length)];
    }

    randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomColor() {
        const r = this.randomInRange(0, 255);
        const g = this.randomInRange(0, 255);
        const b = this.randomInRange(0, 255);
        return [r, g, b];
    }

    // Koppel texturen aan vormen
    getShapeFromTexture(texture) {
        switch (texture) {
            case "grain": return "circle";
            case "coarse-grain": return "square";
            case "smooth": return "triangle";
            case "slimy": return "blob";
            default: return "circle"; // fallback
        }
    }
}
