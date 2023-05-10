$(window).on('load', function() {
    // Get elements
        // Search elements
    const inputBox = document.getElementById("input-box"); 
    const submitButton = document.getElementById("submit-button");
        // Example cities elements
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
    const currentCityDateEl = document.getElementById('city-date');
    const currentEl = document.getElementById('current-weather');
        // Five day forecast element
    const fiveDayForecastEl = document.getElementById('five-day-forecast');

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
    if (localStorage.getItem("lastCity") === null) {
        // Default city
        city = "Kwigillingok";
    } else {
        // Last city
        city = localStorage.getItem("lastCity")
    }

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
        // Store latest city search in local storage
        localStorage.setItem("lastCity", JSON.stringify(city));

        // Update current weather
        currentCityDateEl.textContent = city + ": " + forecast[0].date;
        currentEl.children[0].setAttribute("src", forecast[0].icon);
        currentEl.children[1].textContent = forecast[0].temp;
        currentEl.children[2].textContent = forecast[0].wind;
        currentEl.children[3].textContent = forecast[0].humidity;

        // Update five day forecast
        let j = 0;
        for (i = 1; i < forecast.length; i++) {
            fiveDayForecastEl.children[i-1].children[0].textContent = forecast[i].date;
            fiveDayForecastEl.children[i-1].children[1].setAttribute("src", forecast[i].icon);
            fiveDayForecastEl.children[i-1].children[2].textContent = forecast[i].temp;
            fiveDayForecastEl.children[i-1].children[3].textContent = forecast[i].wind;
            fiveDayForecastEl.children[i-1].children[4].textContent = forecast[i].humidity;
        }        
    }
})

