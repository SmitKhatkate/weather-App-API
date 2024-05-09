document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const weatherResult = document.getElementById('weatherResult');

    searchButton.addEventListener('click', function() {
        const cityName = cityInput.value.trim();
        if (cityName) {
            fetchWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });

    function fetchWeather(city) {
        const apiKey = 'c491ed0312f54385a0a100347240905'; // API key provided
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                weatherResult.textContent = 'Failed to fetch weather data.';
            });
    }

    function displayWeather(data) {
        if (data && data.current) {
            weatherResult.innerHTML = `
                <h3>Weather in ${data.location.name}, ${data.location.country}</h3>
                <p>Temperature: ${data.current.temp_c} °C</p>
                <p>Condition: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Weather icon">
                <p>Wind Speed: ${data.current.wind_kph} km/h</p>
            `;
        } else {
            weatherResult.textContent = 'No weather data found for this city.';
        }
    }
});