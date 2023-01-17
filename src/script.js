function today() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hour}:${minutes}`;

  let todaysDate = document.querySelector("#todays-date");
  todaysDate.innerHTML = `${day} ${time}`;
}

function displayCityInfo(city) {
  let currentLocation = document.querySelector("#current-location");
  let temperature = document.querySelector("#currentTemp");
  let description = document.querySelector("#description");
  let cityTemp = Math.round(celsiusTemp);
  let windSpeed = document.querySelector("#windSpeed");
  let humidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let icon = city.data.weather[0].icon;
  celsiusTemp = city.data.main.temp;
  currentLocation.innerHTML = city.data.name;
  temperature.innerHTML = `${cityTemp}`;
  description.innerHTML = city.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", city.data.weather[0].description);
  humidity.innerHTML = city.data.main.humidity;
  windSpeed.innerHTML = Math.round(city.data.wind.speed);
}

function search(city) {
  let apiKey = "b843fca9f9a79bd6c742882e59a68cab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityInfo);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  search(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b843fca9f9a79bd6c742882e59a68cab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityInfo);
}

function exactCoordinate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFarhenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#currentTemp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#currentTemp");

  temperature.innerHTML = Math.round(celsiusTemp);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", searchSubmit);

let button = document.querySelector("#geolocationButton");
button.addEventListener("click", exactCoordinate);

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFarhenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

today();
search("Milwaukee");
