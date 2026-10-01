const API_KEY = "d1c435fd893415aea5e4b953493150a7";
async function searchWeather() {

    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        // Check API error
        if (!response.ok) {
            alert(data.message || "City not found!");
            return;
        }

        // Display weather
        displayWeather(data);

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Unable to fetch weather data. Please check your internet connection."
        );
    }
}

function displayWeather(data) {

    // City name
    document.getElementById("cityName").textContent =
        `${data.name}, ${data.sys.country}`;


    // Temperature
    document.getElementById("temperature").textContent =
        `${Math.round(data.main.temp)}°`;


    // Weather condition
    document.getElementById("condition").textContent =
        capitalize(data.weather[0].description);


    // Feels like
    document.getElementById("feels").textContent =
        `${Math.round(data.main.feels_like)}°`;


    // Humidity
    document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;


    // Wind speed
    document.getElementById("wind").textContent =
        `${data.wind.speed} km/h`;


    // Pressure
    document.getElementById("pressure").textContent =
        `${data.main.pressure} hPa`;


    // Visibility
    if (data.visibility) {

        document.getElementById("visibility").textContent =
            `${(data.visibility / 1000).toFixed(1)} km`;

    } else {

        document.getElementById("visibility").textContent =
            "N/A";
    }


    // Weather icon
    const weatherType = data.weather[0].main;

    document.getElementById("weatherIcon").textContent =
        getWeatherIcon(weatherType);
}


function getWeatherIcon(weather) {

    switch (weather) {

        case "Clear":
            return "☀️";

        case "Clouds":
            return "☁️";

        case "Rain":
            return "🌧️";

        case "Drizzle":
            return "🌦️";

        case "Thunderstorm":
            return "⛈️";

        case "Snow":
            return "❄️";

        case "Mist":
            return "🌫️";

        case "Smoke":
            return "🌫️";

        case "Haze":
            return "🌫️";

        case "Dust":
            return "🌪️";

        case "Fog":
            return "🌫️";

        case "Sand":
            return "🌪️";

        case "Ash":
            return "🌋";

        case "Squall":
            return "💨";

        case "Tornado":
            return "🌪️";

        default:
            return "🌤️";
    }
}


// ================================
// CAPITALIZE TEXT
// ================================

function capitalize(text) {

    return text
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}


// ================================
// ENTER KEY SEARCH
// ================================

document
    .getElementById("cityInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            searchWeather();

        }

    });


function showDate() {

    const today = new Date();

    const dateText = today.toLocaleDateString("en-IN", {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    });

    document.getElementById("date").textContent = dateText;
}


showDate();


async function loadDefaultWeather() {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        if (response.ok) {

            displayWeather(data);

        }

    } catch (error) {

        console.log("Default weather error:", error);

    }
}
loadDefaultWeather();