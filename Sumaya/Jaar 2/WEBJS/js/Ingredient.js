class Ingredient {
    constructor(id, shape, texture, color, minTime, mixSpeed) {
        this.id = id;
        this.shape = shape;
        this.texture = texture;
        this.color = color;  
        this.minTime = minTime;
        this.mixSpeed = mixSpeed; 
        this.element = this.createElement();
    }

    createElement() {
        const el = document.createElement("div");
        el.classList.add("Ingredient", this.shape, this.texture);
        el.id = `ingredient-${this.id}`;
        el.draggable = true;
        this.setColorStyle(el);  
        this.setDatasetAttributes(el); 
        this.addEventListeners(el);  
        return el;
    }

    setColorStyle(el) {
        const [r, g, b] = this.color;  
        const rgbStr = `rgb(${r}, ${g}, ${b})`;

        if (this.shape === "triangle") {
            el.style.borderBottomColor = rgbStr;  
        } else {
            el.style.backgroundColor = rgbStr; 
            el.style.color = "white";  
        }
    }

    setDatasetAttributes(el) {
        el.dataset.mixSpeed = this.mixSpeed;
        el.dataset.minTime = this.minTime;   
        el.dataset.color = this.color.join(","); 
    }

    addEventListeners(el) {
        el.addEventListener("click", () => this.showInfo()); 
        el.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", el.id); 
        };
    }        

    showInfo() {
        const info = `
            <strong>Id:</strong> ${this.id}<br>
            <strong>Naam:</strong> Ingredient ${this.id}<br>
            <strong>Vorm:</strong> ${this.shape}<br>
            <strong>Textuur:</strong> ${this.texture}<br>
            <strong>Kleur:</strong> rgb(${this.color.join(",")})<br>
            <strong>Minimale mengtijd:</strong> ${this.minTime} ms<br>
            <strong>Mengsnelheid:</strong> ${this.mixSpeed}<br>
        `;
        document.getElementById("ingredientInfoText").innerHTML = info;
        document.getElementById("ingredientInfoPopup").style.display = "block";
    }
}
