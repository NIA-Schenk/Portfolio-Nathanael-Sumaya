let ingredientsManager;
let machineManager;

document.addEventListener("DOMContentLoaded", () => {

    ingredientsManager = new IngredientManager("ingredients");
    machineManager = new MachineManager("machines");
    const potManager = new PotManager("potsContainer");

    const addIngredientBtn = document.getElementById("addIngredientBtn");
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener("click", () => {
            ingredientsManager.addIngredient();
        });
    }

    const addPotBtn = document.getElementById("addPotBtn");
    if (addPotBtn) {
        addPotBtn.addEventListener("click", () => {
            potManager.addPot();
        });
    }

    // Sluit pop-ups 
    const closeIngredientPopup = document.getElementById("closeIngredientPopup");
    if (closeIngredientPopup) {
        closeIngredientPopup.addEventListener("click", () => {
            const ingredientPopup = document.getElementById("ingredientPopup");
            ingredientPopup.style.display = "none";
        });
    }

    const closeBtn = document.getElementById('closeMachinePopup');
    const popup = document.getElementById('machineInfoPopup');

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    const closeIngredientInfoPopup = document.getElementById("closeIngredientInfoPopup");
    if (closeIngredientInfoPopup) {
        closeIngredientInfoPopup.addEventListener("click", () => {
            const ingredientInfoPopup = document.getElementById("ingredientInfoPopup");
            ingredientInfoPopup.style.display = "none";
        });
    }

    // Maakt de create ingredient en machine buttons 
    const createIngredientBtn = document.getElementById("createIngredientBtn");
    if (createIngredientBtn) {
        createIngredientBtn.addEventListener("click", () => {
            const minTime = document.getElementById("minTime").value;
            const mixSpeed = document.getElementById("mixSpeed").value;
            const texture = document.getElementById("texture").value;
            const color = document.getElementById("rgbPicker").value;

            ingredientsManager.createIngredient(minTime, mixSpeed, texture, color);
            document.getElementById("ingredientPopup").style.display = "none";
        });
    }

    // Open het formulier voor het toevoegen van een ingrediënt
    document.getElementById('addIngredientFormBtn').addEventListener('click', function () {
        document.getElementById('ingredientForm').style.display = 'block';
    });

    // Sluit het formulier voor het toevoegen van een ingrediënt
    document.getElementById('closeIngredientForm').addEventListener('click', function () {
        document.getElementById('ingredientForm').style.display = 'none';
    });

    document.getElementById('submitIngredientFormBtn').addEventListener('click', function () {

        ingredientsManager.addCustomIngredientFromForm();
        document.getElementById('ingredientForm').style.display = 'none';
    });

    // Sluit het formulier voor het maken van een ingrediënt
    document.getElementById('closeIngredientForm').addEventListener('click', function () {
        document.getElementById('ingredientForm').style.display = 'none';
    });

    // Sluit het formulier voor het toevoegen van een machine
    document.getElementById('closeMachineForm').addEventListener('click', function () {
        document.getElementById('machineForm').style.display = 'none';
    });

    document.querySelectorAll('.addMachineFormBtn').forEach(button => {
        button.addEventListener('click', function () {
            const hall = this.dataset.hall;

            const machineForm = document.getElementById('machineForm');
            machineForm.style.display = 'block';

            const submitButton = document.getElementById('submitMachineFormBtn');
            submitButton.dataset.hall = hall;
        });
    });

    document.getElementById('submitMachineFormBtn').addEventListener('click', function () {
        const hall = this.dataset.hall;

        const minTime = document.getElementById('createMachineFormMinTime').value;
        const mixSpeed = document.getElementById('createMachineFormMixSpeed').value;

        // Als de machineManager beschikbaar is, voeg dan de machine toe
        if (machineManager) {
            machineManager.createMachine(minTime, mixSpeed, hall);
        }

        document.getElementById('machineForm').style.display = 'none';
    });

    // Sluit het formulier
    document.getElementById('closeMachineForm').addEventListener('click', function () {
        document.getElementById('machineForm').style.display = 'none';
    });

}); 