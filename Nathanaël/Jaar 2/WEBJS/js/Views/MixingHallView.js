class MixingHallView {
    constructor(hallI) {
        this.hallId = parseInt(hallI);

        // Get the existing section or create it if it doesn't exist
        this.hallSection = DOMHelper.getElement(
            `#mixing-hall-${this.hallId} .mixing-hall-container`
        );

        // Set up the basic structure needed for the hall
        this.title = DOMHelper.createElement("h1");
        this.title.textContent = `Mixing Hall ${this.hallId}`;

        // Add location editing elements
        this.locationContainer = DOMHelper.createElement("div", "form-container");
        this.locationLabel = DOMHelper.createElement("label");
        this.locationLabel.textContent = "Location: ";
        this.locationInput = DOMHelper.createElement("input");
        this.locationInput.type = "text";
        this.locationInput.placeholder = "Enter city name";
        this.locationInput.dataset.hallId = this.hallId;

        this.updateLocationBtn = DOMHelper.createElement("button", "create-btn");
        this.updateLocationBtn.textContent = "Update Location";
        this.updateLocationBtn.dataset.hallId = this.hallId;

        this.locationContainer.append(
            this.locationLabel,
            this.locationInput,
            this.updateLocationBtn
        );

        // Weather info display
        this.weatherInfo = DOMHelper.createElement("div", "form-container");
        const weatherTitle = DOMHelper.createElement("h2");
        weatherTitle.textContent = `Weather`;

        this.weatherIcon = DOMHelper.createElement("span", "weather-icon");
        this.weatherTemp = DOMHelper.createElement("span", "weather-temp");
        this.weatherEffect = DOMHelper.createElement("p", "weather-effect");
        this.weatherEffect.dataset.hallId = this.hallId;

        this.weatherInfo.append(
            weatherTitle,
            this.weatherIcon,
            this.weatherTemp,
            this.weatherEffect
        );

        // Machine view container
        this.machineViewContainer = DOMHelper.createElement("div", "machine-view-container");
        this.machineViewContainer.id = `machine-view-${this.hallId}`;

        // Append everything to the hall section
        this.hallSection.append(
            this.title,
            this.locationContainer,
            this.weatherInfo,
            this.machineViewContainer
        );

        // Add it to the DOM if it's not already there
        // if (!DOMHelper.getElement(`#mixing-hall-${this.hallId}`)) {
        //     DOMHelper.getElement(".main").append(this.hallSection);
        // }

        // Initialize hall machine views map
        this.hallMachineViews = new Map();
    }

    // Methods required by the controller
    displayHalls(halls) {
        const hall = halls.find((h) => h.id === this.hallId);
        if (hall) {
            this.title.textContent = `Mixing Hall ${hall.id} (${hall.cityLocation})`;
            this.locationInput.value = hall.cityLocation;
        }
    }

    createHallContent(hall) {
        if (hall.id === this.hallId) {
            return this.hallSection;
        }
        return null;
    }

    activateHall(hallId) {
        if (hallId === this.hallId) {
            this.hallSection.style.display = "block";
        } else {
            this.hallSection.style.display = "none";
        }
    }

    updateWeatherDisplay(hall) {
        if (hall.id === this.hallId) {
            this.weatherIcon.textContent = this.getWeatherIcon(hall.weatherType);
            this.weatherTemp.textContent = `${hall.weatherTemp}°C`;

            const effect = this.getWeatherEffectHandler(hall);
            this.weatherEffect.textContent = effect.description;

            // Add visual indicator based on severity
            this.weatherEffect.classList.remove("normal", "warning", "danger");
            if (effect.multiplier > 1.1 || effect.maxMachines < 2) {
                this.weatherEffect.classList.add("warning");
            } else if (effect.multiplier > 1.2) {
                this.weatherEffect.classList.add("danger");
            } else {
                this.weatherEffect.classList.add("normal");
            }
        }
    }

    getWeatherIcon(weather) {
        switch (weather.toLowerCase()) {
            case "rainy":
                return "🌧️";
            case "snow":
                return "❄️";
            case "sunny":
                return "☀️";
            case "cloudy":
                return "☁️";
            case "stormy":
                return "⛈️";
            default:
                return "🌤️";
        }
    }

    // Event binding methods
    bindEditHallLocation(handler) {
        this.updateLocationBtn.addEventListener("click", (event) => {
            const hallId = parseInt(event.target.dataset.hallId);
            const newLocation = this.locationInput.value.trim();

            if (newLocation) {
                handler(hallId, newLocation);
            } else {
                alert("Please enter a valid location");
            }
        });
    }

    bindSelectHall(handler) {
        this.hallSection.addEventListener("click", () => {
            handler(this.hallId);
        });
    }

    // These handlers will be set by the controller
    getWeatherEffectHandler = (hall) => {
        return {
            description: "Weather effect not initialized",
            multiplier: 1.0,
            maxMachines: Infinity,
        };
    };
    getHallHandler = () => {};

    // Method to get/create a machine view for a hall
    getMachineView(hallId) {
        if (hallId !== this.hallId) return null;

        if (!this.hallMachineViews.has(hallId)) {
            const view = new MixingMachineView(this.hallId); // Pass hallId here

            if (view.machineSection) {
                this.machineViewContainer.appendChild(view.machineSection);
            }

            this.hallMachineViews.set(hallId, view);
        }

        return this.hallMachineViews.get(hallId);
    }
}
