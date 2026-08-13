import WeatherAPI from "./api.js";
import UI from "./ui.js";

const cities = ["Kyiv", "London", "New York"];

const out = document.querySelector(".out");

const title = document.querySelector(".title");

const unitButtons = document.querySelectorAll(".unit-btn");
const languageButtons = document.querySelectorAll(".language-btn");

let weatherData = [];


cities.forEach(city => {

    WeatherAPI.getWeather(city)
        .then(data => {

            weatherData.push(data);

            UI.renderWeather(data, out);

        });

});


unitButtons.forEach(button => {

    button.addEventListener("click", () => {

        UI.currentUnit = button.dataset.unit;

        out.innerHTML = "";

        weatherData.forEach(data => {
            UI.renderWeather(data, out);
        });

    });

});


languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        UI.currentLanguage = button.dataset.language;

        if (UI.currentLanguage === "uk") {
            title.textContent = "Прогноз погоди";
        }

        if (UI.currentLanguage === "en") {
            title.textContent = "Weather forecast";
        }

        out.innerHTML = "";

        weatherData.forEach(data => {
            UI.renderWeather(data, out);
        });

    });

});