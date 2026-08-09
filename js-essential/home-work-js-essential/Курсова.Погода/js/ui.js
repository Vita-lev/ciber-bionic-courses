const UI = {
  weatherContainer: document.querySelector("#weather"),

  forecastContainer: document.querySelector("#forecast"),

  celsiusButton: document.querySelector("#celsiusBtn"),

  fahrenheitButton: document.querySelector("#fahrenheitBtn"),

  currentUnit: "C",

  // Поточна погода
  renderWeather(weatherData) {
    this.weatherContainer.innerHTML = "";

    weatherData.forEach((data) => {
      const temperature = this.convertTemperature(data.main.temp);

      const icon = data.weather[0].icon;

      const description = data.weather[0].description;

      const card = document.createElement("div");

      card.classList.add("weather-card");

      card.innerHTML = `
        <h2>${data.name}</h2>

        <img
          src="https://openweathermap.org/img/wn/${icon}@2x.png"
          alt="${description}"
        >

        <div class="temperature">
          ${temperature}°${this.currentUnit}
        </div>

        <div class="weather-description">
          ${description}
        </div>

        <div class="weather-info">

          <div>
            🌡 Відчувається як:
            ${this.convertTemperature(data.main.feels_like)}°${this.currentUnit}
          </div>

          <div>
            💧 Вологість:
            ${data.main.humidity}%
          </div>

          <div>
            💨 Вітер:
            ${data.wind.speed} м/с
          </div>

          <div>
            🧭 Напрям вітру:
            ${data.wind.deg}°
          </div>

          <div>
            📊 Тиск:
            ${data.main.pressure} hPa
          </div>

        </div>
      `;

      this.weatherContainer.appendChild(card);
    });
  },

  // Переведення температури
  convertTemperature(celsius) {
    if (this.currentUnit === "C") {
      return Math.round(celsius);
    }

    return Math.round((celsius * 9) / 5 + 32);
  },

  // Показати помилку
  showError(message) {
    this.weatherContainer.innerHTML = `
      <div class="error">
        ${message}
      </div>
    `;
  },

  // Цельсій
  setCelsius() {
    this.currentUnit = "C";

    this.celsiusButton.classList.add("active");

    this.fahrenheitButton.classList.remove("active");
  },

  // Фаренгейт
  setFahrenheit() {
    this.currentUnit = "F";

    this.fahrenheitButton.classList.add("active");

    this.celsiusButton.classList.remove("active");
  },

  // Прогноз погоди
  renderForecast(data) {
    const forecastItems = data.list.filter((item) => {
      return item.dt_txt.includes("12:00:00");
    });

    this.forecastContainer.innerHTML = `
      <h2>Прогноз: ${data.city.name}</h2>

      <table class="forecast-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Погода</th>
            <th>Температура</th>
            <th>Вологість</th>
            <th>Вітер</th>
          </tr>
        </thead>

        <tbody>
          ${forecastItems
            .map((item) => {
              const date = new Date(item.dt * 1000);

              const temperature = this.convertTemperature(
                item.main.temp
              );

              const icon = item.weather[0].icon;

              const description = item.weather[0].description;

              return `
                <tr>
                  <td>
                    ${date.toLocaleDateString("uk-UA")}
                  </td>

                  <td>
                    <img
                      src="https://openweathermap.org/img/wn/${icon}.png"
                      alt="${description}"
                    >

                    ${description}
                  </td>

                  <td>
                    ${temperature}°${this.currentUnit}
                  </td>

                  <td>
                    ${item.main.humidity}%
                  </td>

                  <td>
                    ${item.wind.speed} м/с
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
  },
};

export { UI };