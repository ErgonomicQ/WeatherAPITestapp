const apiKey = '9fb7c933cc2d6bdfd3dec3e8e08782b2'; 

const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city-input');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');
const searchHistory = document.querySelector('#search-history');

cityForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const cityName = cityInput.value;
  
  // TODO: Make API call to get weather data based on cityName and apiKey
  
  // TODO: Display current weather and forecast in currentWeather and forecast elements
  
  // TODO: Add cityName to search history
  
  cityInput.value = ''; // Clear the input
});

// TODO: Implement click event for search history items

// TODO: Define functions to display weather data

// TODO: Implement API call to fetch weather data
