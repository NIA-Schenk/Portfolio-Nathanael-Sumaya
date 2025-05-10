const API_KEY = "0552907af001d474a4ae262614d7d4a0";

document.addEventListener("DOMContentLoaded", function () {
    const weatherButton = document.getElementById("Weather");

    if (weatherButton) {
        weatherButton.addEventListener("click", function () {
            checkWeather(); 
        });
    }
});


async function checkWeather() {

    const city = document.getElementById('city').value;
    const weatherElement = document.getElementById('weather');
    const mixTimeElement = document.getElementById('mixTime');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=nl`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weerdata kon niet worden opgehaald');
        }
        const data = await response.json();
        console.log(data);

        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        weatherElement.textContent = `Het weer in ${city} is ${weatherDescription} met een temperatuur van ${temperature}°C.`;

        let mixTime = 10;   // HARDCODED maar moest eigenlijk van de machine, niet aan toegekomen

        if (weatherDescription.includes('regen') || weatherDescription.includes('sneeuw')) {
            mixTime += mixTime * 0.1; // 10% langer bij regen of sneeuw
            console.log('het regent of sneeuwt :)')
        } else if (temperature > 35) {
            mixTime = 10;  // Maximaal 1 machine bij meer dan 35 graden

        } else if (temperature < 10) {
            mixTime += mixTime * 0.15; // 15% langer bij koud weer (onder de 10 graden)
        }

        mixTimeElement.textContent = `De benodigde mengtijd is ${mixTime} miliseconden.`; 

        document.getElementById("city").value = "";
    
    } catch (error) {
        weatherElement.textContent = 'Er is een fout opgetreden bij het ophalen van de weergegevens. Voer de juiste stadsnaam in.';
        console.error(error);
        document.getElementById("city").value = "";
    }
}