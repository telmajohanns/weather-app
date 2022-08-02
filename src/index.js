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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Get forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastElementHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastElementHTML =
        forecastElementHTML +
        `<div class="forecast">
        <h5 class="forecast-date" id="forecast">${formatDay(
          forecastDay.dt
        )}</h5>
        <h6 class="forecast-temp" id="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°C
        <span><img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="32"
      /></span></h6>
        <h6 class="forecast-temp" id="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°C</h6>
      </div>`;
    }
  });
  forecastElementHTML = forecastElementHTML + `</div>`;
  forecastElement.innerHTML = forecastElementHTML;
}

function getForecast(coordinates) {
  let apiKey = "8ae59972850a69a166acd5d323f383fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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
