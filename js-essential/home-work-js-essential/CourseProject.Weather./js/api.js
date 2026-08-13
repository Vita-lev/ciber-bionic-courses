const API_KEY = "9b9c175ab014e4bdbe09435126546e2e";

const WeatherAPI = {

    getWeather(city) {

        return fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        .then(response => response.json());
    }

};

export default WeatherAPI;