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
  hour = addZero(hour);
  let minutes = currentDate.getMinutes();
  minutes = addZero(minutes);
  let time = `${hour}:${minutes}`;

  let todaysDate = document.querySelector("#todays-date");

  if (hour > 12) {
    todaysDate.innerHTML = `${day}, ${time} P.M.`;
  } else {
    todaysDate.innerHTML = `${day}, ${time} A.M.`;
  }
}
function addZero(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

today();

function displayCityInfo(city) {
  let currentLocation = document.querySelector("#current-location");
  let temperature = document.querySelector("#currentTemp");
  let description = document.querySelector("#description");
  let cityTemp = Math.round(city.data.main.temp);
  let windSpeed = document.querySelector("#windSpeed");
  let humidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let icon = city.data.weather[0].icon;

  console.log(city.data);

  currentLocation.innerHTML = city.data.name;
  temperature.innerHTML = `${cityTemp}°`;
  description.innerHTML = city.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
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

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", searchSubmit);

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

let button = document.querySelector("#geolocationButton");
button.addEventListener("click", exactCoordinate);
search("Milwaukee");
