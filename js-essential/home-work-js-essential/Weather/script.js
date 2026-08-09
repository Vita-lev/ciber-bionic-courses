const API_KEY = "9b9c175ab014e4bdbe09435126546e2e";

const cities = ["Kyiv", "London", "New York"];

const out = document.querySelector(".out");
const title = document.querySelector(".title");

const unitButtons = document.querySelectorAll(".unit-btn");
const languageButtons = document.querySelectorAll(".language-btn");


const WeatherAPI = {

    getWeather(city) {

        return fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        .then(response => response.json());
    }

};


const UI = {

    currentUnit: "C",

    currentLanguage: "uk",

    renderWeather(data) {

        let temperature = data.main.temp;

        if (this.currentUnit === "F") {
            temperature = temperature * 9 / 5 + 32;
        }

        let cityName = data.name;

        if (this.currentLanguage === "uk") {

            if (data.name === "Kyiv") {
                cityName = "Київ";
            }

            if (data.name === "London") {
                cityName = "Лондон";
            }

            if (data.name === "New York") {
                cityName = "Нью-Йорк";
            }
        }

        out.innerHTML += `
            <div class="weather-card">

                <h2>${cityName}</h2>

                <img 
                    src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                >

                <p>
                    ${this.currentLanguage === "uk" ? "Температура" : "Temperature"}:
                    ${Math.round(temperature)} °${this.currentUnit}
                </p>

                <p>
                    ${this.currentLanguage === "uk" ? "Погода" : "Weather"}:
                    ${data.weather[0].description}
                </p>

                <p>
                    ${this.currentLanguage === "uk" ? "Вітер" : "Wind"}:
                    ${data.wind.speed} м/с
                </p>

                <p>
                    ${this.currentLanguage === "uk" ? "Тиск" : "Pressure"}:
                    ${data.main.pressure} hPa
                </p>

            </div>
        `;
    }

};


let weatherData = [];




cities.forEach(city => {

    WeatherAPI.getWeather(city)
        .then(data => {

            weatherData.push(data);

            UI.renderWeather(data);

        });

});




unitButtons.forEach(button => {

    button.addEventListener("click", () => {

        UI.currentUnit = button.dataset.unit;

        out.innerHTML = "";

        weatherData.forEach(data => {
            UI.renderWeather(data);
        });

    });

});


//////////

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
            UI.renderWeather(data);
        });

    });

});