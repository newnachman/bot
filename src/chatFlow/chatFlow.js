
export const Flow = {
  start: ['Hi! Welcome to SIMPLE-BOT', 'Lets chat, whats on your mind?'],
  day: ["Ho! the current day is:"],
  chat: ["Its very interesting", "What else?"],
  exit: ["O.K,", "Do you need something else?", "(To finish conversation type 'bye bye')"],
  error: ["Oops, an error occurred when trying retrieving data for you.", "Do you want to try some other question?"],
  loading: ["Loading some data for you..."],
  weather: ["Seems you are looking for the weather forecast", "For which city do you need the info?"],
  choseCity: ["Here is some cities that matches your input:", "(Please type the corresponding number to chose the right location)", " * You can type 'exit' to continue to regular conversation."],
  noCity: ["No options found that matches your location input:", "Type a location for new location, or type 'exit' to continue to regular conversation."],
  end: ["Seems we've got to the end :( ", "It was very nice to chat.", "See you!"]
}

export let ActiveMode = 'chat';
export function updateActiveMode(value) {
  ActiveMode = value || 'chat';
}

export let citiesOptions = [];
export function updateCitiesOptions(value) {
  citiesOptions = value || [];
}

export let chosenCity = {};
export function updateChosenCity(value) {
  chosenCity = value || {};
}

export const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const weatherBaseUrl = 'https://dataservice.accuweather.com/';
export const weatherKey = '?apikey=hXUwroSoLsNYusB47tLETxNfYXNtt9JZ';

export const getCitiesAutocompleteUrl = (searchKey) => {
  if (!searchKey) {  return;  }
  return weatherBaseUrl + 'locations/v1/cities/autocomplete' + weatherKey + '&q=' + searchKey;
}

export const getCurrentWeatherUrl = (locationKey) => {
  if (!locationKey) {  return;  }
  return weatherBaseUrl + 'currentconditions/v1/' + locationKey + weatherKey;
}

export const createCitiesResponseArray = (responseArray) => {
  if (!responseArray || !responseArray.length) {
    return [];
  }
  return responseArray.map( (city, index) => [`Type ${index} for ${city.LocalizedName} in ${city.Country.LocalizedName}`] )
}

export const createWeatherResponseArray = (data) => {
  if (!data) {
    return [];
  }
  return [`Current weather in ${chosenCity.LocalizedName} / ${chosenCity.Country.LocalizedName} is:`, `${data.WeatherText} with ${data.Temperature.Metric.Value} °C`];
}