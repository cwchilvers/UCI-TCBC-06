// OpenWeather
const APIkey = "41a901896f60f480de1298be37bde3f8";
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={' + APIkey + '}';

// Strings
const symbols = {
    cloudy: "☁️",
    fog: "🌫️",
    lightning: "🌩️",
    partlyCloudy: "⛅",
    rain: "🌧️",
    snow: "❄️",
    sun: "☀️",
    tornado: "🌪️",
};

fetch(requestUrl)
    .then(function (response) {
    return response.json();
});