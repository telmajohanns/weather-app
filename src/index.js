//Time and date
let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];

let time = document.querySelector("#date");
time.innerHTML = `${today} ${hours}:${minutes}`;

//Search city
function displayWeather(response) {
  let cityTitle = document.querySelector("#location-title");
  cityTitle.innerHTML = response.data.name;
  let cityTemp = document.querySelector("#temp-title");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#weather");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function findCity(response) {
  let apiKey = "8ae59972850a69a166acd5d323f383fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${response}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location-input").value;
  findCity(input);
}

let searchSubmit = document.querySelector("#location-form");
searchSubmit.addEventListener("submit", submitCity);

//Current location
function findLocation(response) {
  let apiKey = "8ae59972850a69a166acd5d323f383fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentButton = document.querySelector("#curr-location-button");
currentButton.addEventListener("click", getCurrent);

findCity("New York");
