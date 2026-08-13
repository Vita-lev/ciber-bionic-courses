const UI = {

    currentUnit: "C",

    currentLanguage: "uk",

    renderWeather(data, out) {

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

export default UI;