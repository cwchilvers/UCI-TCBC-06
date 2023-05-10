$(window).on('load', function() {
    // Get elements
        // Search elements
    const inputBox = document.getElementById("input-box"); 
    const submitButton = document.getElementById("submit-button");
    const exampleCities = document.getElementById("cities");
    const atlanta = exampleCities.children[0];
    const denver = exampleCities.children[1];
    const seattle = exampleCities.children[2];
    const sanFrancisco = exampleCities.children[3];
    const orlando = exampleCities.children[4];
    const newYork = exampleCities.children[5];
    const chicago = exampleCities.children[6];
    const austin = exampleCities.children[7];
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
    const day3El = fiveDayForecastEl.children[2];
    const day3DateEl = day3El.children[0];
    const day3IconEl = day3El.children[1];
    const day3TempEl = day3El.children[2];
    const day3WindEl = day3El.children[4];
    const day3HumidityEl = day3El.children[6];       
        // Day 4
    const day4El = fiveDayForecastEl.children[3];
    const day4DateEl = day4El.children[0];
    const day4IconEl = day4El.children[1];
    const day4TempEl = day4El.children[2];
    const day4WindEl = day4El.children[4];
    const day4HumidityEl = day4El.children[6];
        // Day 5
    const day5El = fiveDayForecastEl.children[4];
    const day5DateEl = day5El.children[0];
    const day5IconEl = day5El.children[1];
    const day5TempEl = day5El.children[2];
    const day5WindEl = day5El.children[4];
    const day5HumidityEl = day5El.children[6];

    // Weather data
        // Current weather data
    var currentDate;
    var currentIcon;
    var currentTemperature;
    var currentWind;
    var currentHumidity;
    // Five day forecast data
        // Day 1
    var day1Date;
    var day1Icon;
    var day1Temperature;
    var day1Wind;
    var day1Humidity;
        // Day 2
    var day2Date;
    var day2Icon;
    var day2Temperature;
    var day2Wind;
    var day2Humidity;
        // Day 3
    var day3Date;
    var day3Icon;
    var day3Temperature;
    var day3Wind;
    var day3Humidity;
        // Day 4
    var day4Date;
    var day4Icon;
    var day4Temperature;
    var day4Wind;
    var day4Humidity;
        // Day 5
    var day5Date;
    var day5Icon;
    var day5Temperature;
    var day5Wind;
    var day5Humidity;

    // API call parameters
    const limit = 1;
    var city;
    var lat;
    var lon;

    // OpenWeather APIs
    const APIkey = "41a901896f60f480de1298be37bde3f8";
    var geocodingURL;
    var forecastURL;

    // Default city
    city = "Kwigillingok";
    GetCoordinates();
    
    // Search city
    submitButton.addEventListener("click", function(event) {
        event.preventDefault()
        city = inputBox.value;
        GetCoordinates();
      });

    // Selecting example cities
      // Atlanta
    atlanta.addEventListener("click", function(event) {
        event.preventDefault()
        city = atlanta.textContent;
        GetCoordinates();
    });
        // Denver
    denver.addEventListener("click", function(event) {
        event.preventDefault()
        city = denver.textContent;
        GetCoordinates();
    });
        // Seattle
    seattle.addEventListener("click", function(event) {
        event.preventDefault()
        city = seattle.textContent;
        GetCoordinates();
    });
        // San Francisco
    sanFrancisco.addEventListener("click", function(event) {
        event.preventDefault()
        city = sanFrancisco.textContent;
        GetCoordinates();
    });
        // Orlando
    orlando.addEventListener("click", function(event) {
        event.preventDefault()
        city = orlando.textContent;
        GetCoordinates();
    });
        // New York
    newYork.addEventListener("click", function(event) {
        event.preventDefault()
        city = newYork.textContent;
        GetCoordinates();
    });
        // Chicago
    chicago.addEventListener("click", function(event) {
        event.preventDefault()
        city = chicago.textContent;
        GetCoordinates();
    });
        // Austin
    austin.addEventListener("click", function(event) {
        event.preventDefault()
        city = austin.textContent;
        GetCoordinates();
    });

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
            city = data[0].name;
            
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
            currentDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
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
            day1Date = new Date(data.list[4].dt * 1000).toLocaleDateString("en-US");
            day1Weather = data.list[4].weather[0].main;
            day1Icon = 'https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@4x.png';
            day1Temperature = Math.round(data.list[4].main.temp);
            day1Wind = Math.round(data.list[4].wind.speed);
            day1Humidity = data.list[4].main.humidity;
            // Day 2
            day2Date = new Date(data.list[12].dt * 1000).toLocaleDateString("en-US");
            day2Icon = 'https://openweathermap.org/img/wn/' + data.list[12].weather[0].icon + '@4x.png';
            day2Temperature = Math.round(data.list[12].main.temp);
            day2Wind = Math.round(data.list[12].wind.speed);
            day2Humidity = data.list[12].main.humidity;           
            // Day 3
            day3Date = new Date(data.list[20].dt * 1000).toLocaleDateString("en-US");
            day3Weather = data.list[20].weather[0].main;
            day3Icon = 'https://openweathermap.org/img/wn/' + data.list[20].weather[0].icon + '@4x.png';
            day3Temperature = Math.round(data.list[20].main.temp);
            day3Wind = Math.round(data.list[20].wind.speed);
            day3Humidity = data.list[20].main.humidity;        
            // Day 4
            day4Date = new Date(data.list[28].dt * 1000).toLocaleDateString("en-US");
            day4Weather = data.list[28].weather[0].main;
            day4Icon = 'https://openweathermap.org/img/wn/' + data.list[28].weather[0].icon + '@4x.png';
            day4Temperature = Math.round(data.list[28].main.temp);
            day4Wind = Math.round(data.list[28].wind.speed);
            day4Humidity = data.list[28].main.humidity;        
            // Day 5
            day5Date = new Date(data.list[36].dt * 1000).toLocaleDateString("en-US");
            day5Weather = data.list[36].weather[0].main;
            day5Icon = 'https://openweathermap.org/img/wn/' + data.list[36].weather[0].icon + '@4x.png';
            day5Temperature = Math.round(data.list[36].main.temp);
            day5Wind = Math.round(data.list[36].wind.speed);
            day5Humidity = data.list[36].main.humidity;        

            UpdatePage();
        });
    }
    
    // Update page with retrieved data
    function UpdatePage() {
        // Update current weather
        currentCityDateEl.textContent = city + ": " + currentDate;
        currentTempEl.textContent = "Temp: " + currentTemperature + "°F";
        currentWindEl.textContent = "Wind: " + currentWind + " mph";
        currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
        currentIconEl.setAttribute("src", currentIcon);
        // Update forecast day 1
        day1DateEl.textContent = day1Date.split(" ")[0];
        day1IconEl.setAttribute("src", day1Icon);
        day1TempEl.textContent = "Temp: " + day1Temperature + "°F";
        day1WindEl.textContent = "Wind: " + day1Wind + " mph";
        day1HumidityEl.textContent = "Humidity: " + day1Humidity + "%";
        // Update forecast day 2
        day2DateEl.textContent = day2Date.split(" ")[0];
        day2IconEl.setAttribute("src", day2Icon);
        day2TempEl.textContent = "Temp: " + day2Temperature + "°F";
        day2WindEl.textContent = "Wind: " + day2Wind + " mph";
        day2HumidityEl.textContent = "Humidity: " + day2Humidity + "%";
        // Update forecast day 3
        day3DateEl.textContent = day3Date.split(" ")[0];
        day3IconEl.setAttribute("src", day3Icon);
        day3TempEl.textContent = "Temp: " + day3Temperature + "°F";
        day3WindEl.textContent = "Wind: " + day3Wind + " mph";
        day3HumidityEl.textContent = "Humidity: " + day3Humidity + "%";
        // Update forecast day 4
        day4DateEl.textContent = day4Date.split(" ")[0];
        day4IconEl.setAttribute("src", day4Icon);
        day4TempEl.textContent = "Temp: " + day4Temperature + "°F";
        day4WindEl.textContent = "Wind: " + day4Wind + " mph";
        day4HumidityEl.textContent = "Humidity: " + day4Humidity + "%";
        // Update forecast day 5
        day5DateEl.textContent = day5Date.split(" ")[0];
        day5IconEl.setAttribute("src", day5Icon);
        day5TempEl.textContent = "Temp: " + day5Temperature + "°F";
        day5WindEl.textContent = "Wind: " + day5Wind + " mph";
        day5HumidityEl.textContent = "Humidity: " + day5Humidity + "%";
    }
})

