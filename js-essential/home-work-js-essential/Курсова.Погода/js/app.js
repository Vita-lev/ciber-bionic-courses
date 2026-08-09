import { WeatherAPI } from "./api.js";

import { UI } from "./ui.js";

let weatherData = [];

async function loadWeather() {
  try {
    weatherData = await WeatherAPI.getAllWeather();

    UI.renderWeather(weatherData);
  } catch (error) {
    UI.showError(error.message);
  }
}

UI.celsiusButton.addEventListener("click", () => {
  UI.setCelsius();

  UI.renderWeather(weatherData);
});

UI.fahrenheitButton.addEventListener("click", () => {
  UI.setFahrenheit();

  UI.renderWeather(weatherData);
});

loadWeather();

const currentWeatherButton =
  document.querySelector("#currentWeatherBtn");

const forecastButton =
  document.querySelector("#forecastBtn");

const forecastControls =
  document.querySelector("#forecastControls");

const showForecastButton =
  document.querySelector("#showForecastBtn");

const citySelect =
  document.querySelector("#citySelect");

const weatherContainer =
  document.querySelector("#weather");

const forecastContainer =
  document.querySelector("#forecast");


currentWeatherButton.addEventListener("click", () => {
  weatherContainer.classList.remove("hidden");

  forecastContainer.classList.add("hidden");

  forecastControls.classList.add("hidden");

  currentWeatherButton.classList.add("active");

  forecastButton.classList.remove("active");
});


forecastButton.addEventListener("click", () => {
  weatherContainer.classList.add("hidden");

  forecastContainer.classList.remove("hidden");

  forecastControls.classList.remove("hidden");

  forecastButton.classList.add("active");

  currentWeatherButton.classList.remove("active");
});


showForecastButton.addEventListener("click", async () => {
  try {
    const cityId = citySelect.value;

    const forecastData =
      await WeatherAPI.getForecast(cityId);

    UI.renderForecast(forecastData);

  } catch (error) {
    UI.showError(error.message);
  }
});