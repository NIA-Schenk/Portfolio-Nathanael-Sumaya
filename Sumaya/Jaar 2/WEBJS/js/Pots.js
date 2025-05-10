class Pot {
    constructor(id, mixSpeed = null, minTime = null) {
        this.id = id;
        this.mixSpeed = mixSpeed;
        this.minTime = minTime;
        this.element = this.createPotElement();
    }

    createPotElement() {
        const pot = document.createElement("div");
        pot.className = "Pot";
        pot.id = `pot-${this.id}`;
        pot.draggable = true;

        pot.dataset.mixSpeed = this.mixSpeed;
        pot.dataset.minTime = this.minTime;

        const content = document.createElement("div");
        content.className = "pot-content dropzone";
        pot.appendChild(content);

        this.setupDragEvents(pot);
        this.setupDropzone(content);

        return pot;
    }

    setupDragEvents(pot) {
        pot.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", pot.id);
        };
    }

    setupDropzone(zone) {
        zone.ondragover = (e) => e.preventDefault();
        zone.ondrop = (e) => this.handleDrop(e, zone);
    }

    handleDrop(e, zone) {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");
        const dragged = document.getElementById(draggedId);
        if (!dragged) return;

        const draggedMixSpeed = dragged.dataset.mixSpeed;

        if (!this.mixSpeed || this.mixSpeed === "null") {
            this.mixSpeed = draggedMixSpeed;
            this.element.dataset.mixSpeed = draggedMixSpeed;
            console.log(`Pot krijgt mixSpeed: ${this.mixSpeed}`);
        }

        if (this.mixSpeed !== draggedMixSpeed) {
            alert("Dit ingrediënt heeft een andere mengsnelheid en mag niet in deze pot.");
            return;
        }

        zone.appendChild(dragged);
        dragged.style.transform = "scale(0.8)";
        dragged.style.margin = "2px 0";
    }

    appendTo(container) {
        container.appendChild(this.element);
    }
}
