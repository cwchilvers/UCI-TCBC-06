$(window).on('load', function() {
    // Get elements
    // Current weather elements
    const currentEl = document.getElementById('current-weather');
    const currentCityDateEl = document.getElementById('city-date');
    const currentIconEl = currentEl.children[3];
    const currentTempEl = currentEl.children[0];
    const currentWindEl = currentEl.children[1];
    const currentHumidityEl = currentEl.children[2];
    // Five day forecast elements
    const fiveDayForecastEl = document.getElementById('five-day-forecast');
    // Day 1
    const day1El = fiveDayForecastEl.children[0];
    const day1Date = day1El.children[0];
    // Day 2
    // Day 3
    // Day 4
    // Day 5

    // Weather data
    // Current weather data
    var currentDate;
    var currentWeather;
    var currentIcon;
    var currentTemperature;
    var currentWind;
    var currentHumidity;
    // Five day forecast data
    // Day 1
    // Day 2
    // Day 3
    // Day 4
    // Day 5


    // API call parameters
    const limit = 1;
    var city;
    var lat;
    var lon;

    // OpenWeather APIs
    const APIkey = "41a901896f60f480de1298be37bde3f8";
    var geocodingURL;
    var forecastURL;
    var icon = 'https://openweathermap.org/img/wn/' + currentIcon + '@4x.png';












    city = "Aliso Viejo";

    GetCoordinates();
    



    function GetCoordinates() {

        geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=' + limit + '&appid=' + APIkey;
    
        fetch(geocodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            GetForecast();
        });    
    }
    
    
    function GetForecast() {
    
        forecastURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid='+ APIkey + '&units=imperial';
    
        fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentWeather = data.weather[0].main;
            currentIcon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
            currentTemperature = Math.round(data.main.temp);
            currentWind = Math.round(data.wind.speed);
            currentHumidity = data.main.humidity;
    

            console.log(data);


            UpdatePage();
        });
    }
    
    function UpdatePage() {
        currentCityDateEl.textContent = city;
        currentTempEl.textContent = "Temp: " + currentTemperature + "°F";
        currentWindEl.textContent = "Wind: " + currentWind + " mph";
        currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
        currentIconEl.setAttribute("src", currentIcon);
    }
})
