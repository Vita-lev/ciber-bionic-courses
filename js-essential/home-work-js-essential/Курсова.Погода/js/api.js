const API_KEY = "bf35cac91880cb98375230fb443a116f";

const cities = [
  {
    name: "Київ",
    id: 703448,
  },
  {
    name: "Лондон",
    id: 2643743,
  },
  {
    name: "Нью-Йорк",
    id: 5128638,
  },
];

const WeatherAPI = {
  // Отримуємо поточну погоду одного міста
  async getWeather(cityId) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=uk`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Не вдалося отримати дані про погоду");
    }

    const data = await response.json();

    return data;
  },

  // Отримуємо поточну погоду всіх трьох міст
  async getAllWeather() {
    const requests = cities.map((city) => {
      return this.getWeather(city.id);
    });

    return Promise.all(requests);
  },

  // Отримуємо прогноз одного міста
  async getForecast(cityId) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric&lang=uk`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Не вдалося отримати прогноз");
    }

    const data = await response.json();

    return data;
  },
};

export { WeatherAPI, cities };