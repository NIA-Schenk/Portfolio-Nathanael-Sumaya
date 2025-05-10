class MixingHallModel {
    constructor() {
        this.halls = JSON.parse(localStorage.getItem("mixingHalls")) || [
            {
                id: 1,
                cityLocation: "Amsterdam",
                weatherType: "cloudy",
                weatherTemp: 15,
                machines: [],
            },
            {
                id: 2,
                cityLocation: "Den Bosch",
                weatherType: "sunny",
                weatherTemp: 18,
                machines: [],
            },
        ];

        // Save the initial state if not already in localStorage
        if (!localStorage.getItem("mixingHalls")) {
            localStorage.setItem("mixingHalls", JSON.stringify(this.halls));
        }
    }

    bindHallListChanged(callback) {
        this.onHallListChanged = callback;
    }

    _commit() {
        if (this.onHallListChanged) {
            this.onHallListChanged(this.halls);
        }
        localStorage.setItem("mixingHalls", JSON.stringify(this.halls));
    }

    getHall(id) {
        return this.halls.find((hall) => hall.id === id);
    }

    getAllHalls() {
        return this.halls;
    }

    async updateHallLocation(id, newLocation) {
        const hall = this.getHall(id);
        if (hall) {
            hall.cityLocation = newLocation;

            try {
                const weatherData = await WeatherController.getWeatherForLocation(newLocation);
                hall.weatherType = weatherData.type;
                hall.weatherTemp = weatherData.temp;

                this._commit();
                return hall;
            } catch (error) {
                console.error("Error updating weather for new location:", error);
                // Still update the location even if weather update fails
                this._commit();
                return hall;
            }
        }
        return null;
    }

    async updateWeather() {
        try {
            for (const hall of this.halls) {
                const weatherData = await WeatherController.getWeatherForLocation(
                    hall.cityLocation
                );
                hall.weatherType = weatherData.type;
                hall.weatherTemp = weatherData.temp;
            }
            this._commit();
            return true;
        } catch (error) {
            console.error("Error updating weather:", error);
            return false;
        }
    }

    getWeatherMixingEffect(hallId) {
        const hall = this.getHall(hallId);
        if (!hall) return { description: "Hall not found", multiplier: 1.0, maxMachines: Infinity };

        return WeatherController.getWeatherMixingEffect(hall.weatherType, hall.weatherTemp);
    }
}
