class WeatherController {
    static async getWeatherForLocation(city) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5362602471befc89621dcebfc36a46f6`
            );

            if (!response.ok) {
                console.error(`Weather API error: ${response.status}`);
                return { type: "normal", temp: 20 }; // Default fallback
            }

            const data = await response.json();

            // Map OpenWeatherMap conditions to our simplified weather types
            let weatherType = "normal";
            if (
                data.weather[0].main.toLowerCase().includes("rain") ||
                data.weather[0].main.toLowerCase().includes("snow")
            ) {
                weatherType = "rainy";
            } else if (data.weather[0].main.toLowerCase().includes("cloud")) {
                weatherType = "cloudy";
            } else if (
                data.weather[0].main.toLowerCase().includes("thunder") ||
                data.weather[0].main.toLowerCase().includes("storm")
            ) {
                weatherType = "stormy";
            } else if (data.weather[0].main.toLowerCase().includes("clear")) {
                weatherType = "sunny";
            }

            return {
                type: weatherType,
                temp: data.main.temp,
            };
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return { type: "normal", temp: 20 }; // Default fallback
        }
    }

    static getWeatherMixingEffect(weatherType, temp) {
        // Base effect object
        let effect = {
            description: "Normal mixing conditions",
            multiplier: 1.0,
            maxMachines: Infinity,
        };

        // Apply weather-based effects
        if (
            weatherType.toLowerCase().includes("rain") ||
            weatherType.toLowerCase().includes("snow")
        ) {
            effect.description = "Rain/snow - Mixing takes 10% longer due to humid conditions";
            effect.multiplier = 1.1;
        }

        // Apply temperature-based effects
        if (temp >= 35) {
            effect.description = `High temperature - Warmer than 35°C: Maximum 1 machine can operate`;
            effect.maxMachines = 1;
        }

        if (temp < 10) {
            effect.description = `Low temperature - Colder than 10°C: Mixing takes 15% longer`;
            effect.multiplier *= 1.15;
        }

        return effect;
    }
}
