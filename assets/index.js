const apiKey = '9fb7c933cc2d6bdfd3dec3e8e08782b2'; 

const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city-input');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');
const searchHistory = document.querySelector('#search-history');

const savedPlaces = JSON.parse(localStorage.getItem('searchHistory')) || [];
savedPlaces.forEach(city => addCitytoSearchHistory(city));

cityForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const cityName = cityInput.value;
  const theWeather = await getTheWeather(cityName);

if (weatherData) {
  displayTheWeather(weatherData);
  displayTheForecast(weatherData);

  addCitytoSearchHistory(cityName);
  savedPlaces.push(cityName);
  localStorage.setItem('searchHistory', JSON.stringify(savedPlaces))
}




  // API call to get current weather data based on cityName and apiKey
  async function getTheWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Current weather data not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    return null;
  }
}

  // API call to get the 5-day forecast, same params
  async function getTheForecast(cityName){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
}




// Display current weather data
function displayTheWeather(currentWeatherData) {
  const cityName = currentWeatherData.name;
  const temperature = currentWeatherData.main.temp;
  const humidity = currentWeatherData.main.humidity;
  const windSpeed = currentWeatherData.wind.speed;
  const weatherDescription = currentWeatherData.weather[0].description;

  const timestamp = currentWeatherData.dt * 1000; // Convert UNIX timestamp to milliseconds
  const currentDate = new Date(timestamp);
  const dayOfWeek = getDayOfWeek(currentDate.getDay());

  currentWeather.innerHTML = `
    <h2>Current Weather in ${cityName}</h2>
    <p>Day: ${dayOfWeek}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Weather: ${weatherDescription}</p>
  `;
}

// Get the day of the week as a string
function getDayOfWeek(dayNumber) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayNumber];
}




  // Display forecast data
function displayTheForecast(forecastData) {
  const forecastList = forecastData.list; // Assuming the forecast data structure
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let currentDay = '';
  let dayForecastHtml = '';
  
  forecastList.forEach(forecastItem => {
    const forecastDate = new Date(forecastItem.dt * 1000); // Convert UNIX timestamp to milliseconds
    const dayOfWeek = daysOfWeek[forecastDate.getDay()];
    
    if (dayOfWeek !== currentDay) {
      if (currentDay !== '') {
        // Display the forecast for the current day
        const dayBox = createDayBox(currentDay, dayForecastHtml);
        forecast.appendChild(dayBox);
      }
      
      // Start a new day
      currentDay = dayOfWeek;
      dayForecastHtml = '';
    }
    
    // Add the forecast data for the current time slot
    dayForecastHtml += `
      <div class="time-slot">
        <p>${forecastItem.dt_txt.substring(11, 16)}</p>
        <p>Temperature: ${forecastItem.main.temp}°C</p>
        <p>Weather: ${forecastItem.weather[0].description}</p>
      </div>
    `;
  });
  
  // Display the forecast for the last day
  const dayBox = createDayBox(currentDay, dayForecastHtml);
  forecast.appendChild(dayBox);
}

// Create a container for a day's forecast
function createDayBox(dayOfWeek, forecastHtml) {
  const dayBox = document.createElement('div');
  dayBox.classList.add('day-box');
  dayBox.innerHTML = `
    <p>${dayOfWeek}</p>
    ${forecastHtml}
  `;
  return dayBox;
}

// Rest of your code

  cityInput.value = ''; // Clear the input
});

// TODO: Implement click event for search history items

// TODO: Define functions to display weather data

// TODO: Implement API call to fetch weather data
