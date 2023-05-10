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
    const day1DateEl = day1El.children[0];
    const day1IconEl = day1El.children[1];
    const day1TempEl = day1El.children[2];
    const day1WindEl = day1El.children[4];
    const day1HumidityEl = day1El.children[6];
        // Day 2
    const day2El = fiveDayForecastEl.children[1];
    const day2DateEl = day2El.children[0];
    const day2IconEl = day2El.children[1];
    const day2TempEl = day2El.children[2];
    const day2WindEl = day2El.children[4];
    const day2HumidityEl = day2El.children[6];
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
    var day1Date;
    var day1Weather;
    var day1Icon;
    var day1Temperature;
    var day1Wind;
    var day1Humidity;
        // Day 2
    var day2Date;
    var day2Weather;
    var day2Icon;
    var day2Temperature;
    var day2Wind;
    var day2Humidity;
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
    


    // Get coordinates of city
    function GetCoordinates() {
        geocodingURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=' + limit + '&appid=' + APIkey;
    
        fetch(geocodingURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            GetCurrentWeather();
        });    
    }
    
    // Enter coordinates to find current weather for city
    function GetCurrentWeather() {
        weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid='+ APIkey + '&units=imperial';
    
        fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentWeather = data.weather[0].main;
            currentIcon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
            currentTemperature = Math.round(data.main.temp);
            currentWind = Math.round(data.wind.speed);
            currentHumidity = data.main.humidity;

            GetForecast();
        });
    }

    // Enter coordinates to get 5 day forecast for city
    function GetForecast() {
        forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid='+ APIkey + '&units=imperial';
    
        fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Day 1
            day1Weather = data.list[4].weather[0].main;
            day1Icon = 'https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@4x.png';
            day1Temperature = Math.round(data.list[4].main.temp);
            day1Wind = Math.round(data.list[4].wind.speed);
            day1Humidity = data.list[4].main.humidity;
            // Day 2
            day2Weather = data.list[12].weather[0].main;
            day2Icon = 'https://openweathermap.org/img/wn/' + data.list[12].weather[0].icon + '@4x.png';
            day2Temperature = Math.round(data.list[12].main.temp);
            day2Wind = Math.round(data.list[12].wind.speed);
            day2Humidity = data.list[12].main.humidity;           





            UpdatePage();
        });
    }
    
    function UpdatePage() {
        // Update current weather
        currentCityDateEl.textContent = city;
        currentTempEl.textContent = "Temp: " + currentTemperature + "°F";
        currentWindEl.textContent = "Wind: " + currentWind + " mph";
        currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
        currentIconEl.setAttribute("src", currentIcon);
        // Update forecast day 1
        day1DateEl.textContent = "day 1";
        day1IconEl.setAttribute("src", day1Icon);
        day1TempEl.textContent = "Temp: " + day1Temperature + "°F";
        day1WindEl.textContent = "Wind: " + day1Wind + " mph";
        day1HumidityEl.textContent = "Humidity: " + day1Humidity + "%";
        // Update forecast day 2
        day2DateEl.textContent = "day 2";
        day2IconEl.setAttribute("src", day2Icon);
        day2TempEl.textContent = "Temp: " + day2Temperature + "°F";
        day2WindEl.textContent = "Wind: " + day2Wind + " mph";
        day2HumidityEl.textContent = "Humidity: " + day2Humidity + "%";
    }
})

