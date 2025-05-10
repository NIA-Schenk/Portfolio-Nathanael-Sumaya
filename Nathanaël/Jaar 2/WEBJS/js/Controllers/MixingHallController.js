class MixingHallController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind model event
        this.model.bindHallListChanged(this.onHallListChanged.bind(this));

        // Bind view events
        this.view.bindEditHallLocation(this.handleEditLocation.bind(this));
        this.view.bindSelectHall(this.handleSelectHall.bind(this));

        // Set the handler for weather effects
        this.view.getWeatherEffectHandler = (hall) => {
            if (!hall)
                return { description: "Invalid hall", multiplier: 1.0, maxMachines: Infinity };

            const weatherType = hall.weatherType;
            const temp = hall.weatherTemp;

            return WeatherController.getWeatherMixingEffect(weatherType, temp);
        };

        // Initial display
        this.view.displayHalls(this.model.getAllHalls());
        const hall = this.model.getHall(this.view.hallId);
        if (hall) {
            this.view.updateWeatherDisplay(hall);
        }
    }

    onHallListChanged(halls) {
        this.view.displayHalls(halls);
        const hall = halls.find((h) => h.id === this.view.hallId);
        if (hall) {
            this.view.updateWeatherDisplay(hall);
        }
    }

    async handleEditLocation(hallId, newLocation) {
        try {
            const updatedHall = await this.model.updateHallLocation(hallId, newLocation);
            if (updatedHall) {
                this.view.displayHalls(this.model.getAllHalls());
                this.view.updateWeatherDisplay(updatedHall);
            }
        } catch (error) {
            console.error("Error editing location:", error);
            alert("Failed to update location. Please try again.");
        }
    }

    handleSelectHall(hallId) {
        this.view.activateHall(hallId);
    }
}
