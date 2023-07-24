$(window).on('load', function() {
    // Get elements
    const element = {
        inputBox: document.getElementById("input-box"),
        submitButton: document.getElementById("submit-button"),
        searchHistory: document.getElementById("search-history"),
        cityDate: document.getElementById('city-date'),
        currentWeather: document.getElementById('current-weather'),
        fiveDayForecast: document.getElementById('five-day-forecast'),
    };
    
    // Create forecast array
    const forecast = Array.from({ length: 6 }, () => ({
        date: null,
        icon: null,
        temp: null,
        wind: null,
        humidity: null,
    }));
    
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];    // Get Search History from Local Storage
    let city = searchHistory[0] || "Kwigillingok";                                  // Set city to 1st item in search history or default to Kwigillingok
    const limit = 1;
    const APIkey = "41a901896f60f480de1298be37bde3f8";
    let lat, lon;

    // Update search history
    const updateSearchHistory = () => {
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));       // Update search history in local storage
        for (let i = 0; i < searchHistory.length; i++) {
            element.searchHistory.children[i].children[0].textContent = searchHistory[i];   
        }
    }
    
    // Get weather data from API
    const getWeatherData = async () => {
        const geocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIkey}`;
        const geoResponse = await fetch(geocodingURL);
        const geoData = await geoResponse.json();

        lat = geoData[0].lat;
        lon = geoData[0].lon;
        city = geoData[0].name;

        const index = searchHistory.indexOf(city);
        if (index !== -1) {
            searchHistory.splice(index, 1);
        }
        searchHistory.unshift(city);
        searchHistory = searchHistory.slice(0, 10);
        updateSearchHistory();

        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        forecast[0].date = new Date(weatherData.dt * 1000).toLocaleDateString("en-US");
        forecast[0].icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
        forecast[0].temp = `Temp: ${Math.round(weatherData.main.temp)}°F`;
        forecast[0].wind = `Wind: ${Math.round(weatherData.wind.speed)} mph`;
        forecast[0].humidity = `Humidity: ${weatherData.main.humidity}%`;

        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        let j = 4;
        for (let i = 1; i < forecast.length; i++) {
            forecast[i].date = new Date(forecastData.list[j].dt * 1000).toLocaleDateString("en-US");
            forecast[i].icon = `https://openweathermap.org/img/wn/${forecastData.list[j].weather[0].icon}@4x.png`;
            forecast[i].temp = `Temp: ${Math.round(forecastData.list[j].main.temp)}°F`;
            forecast[i].wind = `Wind: ${Math.round(forecastData.list[j].wind.speed)} mph`;
            forecast[i].humidity = `Humidity: ${forecastData.list[j].main.humidity}%`;
            j += 8;
        }

        updatePage();
    }

    // Update page
    const updatePage = () => {
        element.cityDate.textContent = `${city}: ${forecast[0].date}`;
        element.currentWeather.children[0].setAttribute("src", forecast[0].icon);
        element.currentWeather.children[1].textContent = forecast[0].temp;
        element.currentWeather.children[2].textContent = forecast[0].wind;
        element.currentWeather.children[3].textContent = forecast[0].humidity;

        for (let i = 1; i < forecast.length; i++) {
            element.fiveDayForecast.children[i - 1].children[0].textContent = forecast[i].date;
            element.fiveDayForecast.children[i - 1].children[1].setAttribute("src", forecast[i].icon);
            element.fiveDayForecast.children[i - 1].children[2].textContent = forecast[i].temp;
            element.fiveDayForecast.children[i - 1].children[3].textContent = forecast[i].wind;
            element.fiveDayForecast.children[i - 1].children[4].textContent = forecast[i].humidity;
        }
    }

    // Add event listeners to cities in search history
    for (let i = 0; i < 10; i++) {
        element.searchHistory.children[i].children[0].addEventListener("click", (event) => {
            event.preventDefault();
            city = element.searchHistory.children[i].children[0].textContent;
            getWeatherData();
        });
    }

    // Add event listener to search submit button
    element.submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        city = element.inputBox.value;
        getWeatherData();
    });

    getWeatherData();
});