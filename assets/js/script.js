$(window).on('load', function() {
    // Get elements
    const element = {
        // Search elements
        inputBox: document.getElementById("input-box"),
        submitButton: document.getElementById("submit-button"),
        // Seach History
        searchHistory: document.getElementById("search-history"),
        // Current weather elements
        cityDate: document.getElementById('city-date'),
        currentWeather: document.getElementById('current-weather'),
        fiveDayForecast: document.getElementById('five-day-forecast'),
    }

    // Forecast
    var forecast = [
        {
            date: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null
        },
        {
            date: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null
        },
        {
            date: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null
        },
        {
            date: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null
        },
        {
            date: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null
        },
        {
            date: null,
            icon: null,
            temp: null,
            wind: null,
            humidity: null
        }
    ]

    var searchHistory = [];

    // API call parameters
    const limit = 1;
    var city;
    var lat;
    var lon;

    // OpenWeather APIs
    const APIkey = "41a901896f60f480de1298be37bde3f8";
    var geocodingURL;
    var forecastURL;

    // Load last city (if it exists)
    if (localStorage.getItem("searchHistory") === null) {
        // Default city
        city = "Kwigillingok";
    } else {
        // Load last city and search history
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        city = searchHistory[0];
    }

    element.searchHistory.children[0].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[0].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[1].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[1].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[2].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[2].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[3].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[3].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[4].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[4].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[5].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[5].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[6].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[6].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[7].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[7].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[8].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[8].children[0].textContent;
        GetCoordinates();
        });

    element.searchHistory.children[9].children[0].addEventListener("click", function(event) {
        event.preventDefault()
        city = element.searchHistory.children[9].children[0].textContent;
        GetCoordinates();
        });

    GetCoordinates();
  
    // Search city
    element.submitButton.addEventListener("click", function(event) {
        event.preventDefault()
        city = element.inputBox.value;
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
            
            // Search History
            if (city === "Kwigillingok" && searchHistory.length === 0) {
                GetCurrentWeather();
            } else {
                if (city !== searchHistory[0]){
                    searchHistory.unshift(city);
                }
                if (searchHistory.length > 10) {
                    searchHistory.length = 10;
                }
                GetCurrentWeather();
            }
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
            forecast[0].date = new Date(data.dt * 1000).toLocaleDateString("en-US");
            forecast[0].icon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
            forecast[0].temp = "Temp: " + String(Math.round(data.main.temp)) + "°F";
            forecast[0].wind = "Wind: " + String(Math.round(data.wind.speed)) + " mph";
            forecast[0].humidity = "Humidity: " + String(data.main.humidity) + "%";;
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
            let j = 4;
            for (i = 1; i < forecast.length; i++) {
                forecast[i].date = new Date(data.list[j].dt * 1000).toLocaleDateString("en-US");
                forecast[i].icon = 'https://openweathermap.org/img/wn/' + data.list[j].weather[0].icon + '@4x.png';
                forecast[i].temp = "Temp: " + String(Math.round(data.list[j].main.temp)) + "°F";
                forecast[i].wind = "Wind: " + String(Math.round(data.list[j].wind.speed)) + " mph";
                forecast[i].humidity = "Humidity: " + String(data.list[j].main.humidity) + "%";
                j += 8;
            }
            UpdatePage();
        });
    }

    // Update page with retrieved data
    function UpdatePage() {
        // Store search history in local storage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        // Update current weather
        element.cityDate.textContent = city + ": " + forecast[0].date;
        element.currentWeather.children[0].setAttribute("src", forecast[0].icon);
        element.currentWeather.children[1].textContent = forecast[0].temp;
        element.currentWeather.children[2].textContent = forecast[0].wind;
        element.currentWeather.children[3].textContent = forecast[0].humidity;

        // Update five day forecast
        let j = 0;
        for (i = 1; i < forecast.length; i++) {
            element.fiveDayForecast.children[i-1].children[0].textContent = forecast[i].date;
            element.fiveDayForecast.children[i-1].children[1].setAttribute("src", forecast[i].icon);
            element.fiveDayForecast.children[i-1].children[2].textContent = forecast[i].temp;
            element.fiveDayForecast.children[i-1].children[3].textContent = forecast[i].wind;
            element.fiveDayForecast.children[i-1].children[4].textContent = forecast[i].humidity;
        }        

        // Update search history
        for (i = 0; i < searchHistory.length; i++) {
            element.searchHistory.children[i].children[0].textContent = searchHistory[i];
        }
    }
})

