let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;

function submitCity(event) {
  event.preventDefault();
  let apiKey = "876d2525e17a4036902a2d9f29fb5837";
  let units = "metric";
  let enteredCity = document.querySelector("#weather-city");
  let city = document.querySelector("h1");
  city.innerHTML = enteredCity.value;
  let searchCity = enteredCity.value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${searchCity}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(displayWeather);
  console.log(enteredCity.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2"> 
            <div class="forecastDate-day">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="forecastDateTemperatures">
                    <span class="forecastDateTemperaturesHigh">${Math.round(
                      forecastDay.temp.max
                    )}??
                    </span>
                    <span class="forecastDateTemperaturesLow">${Math.round(
                      forecastDay.temp.min
                    )}??</span>
                </div>
        </div> 
    
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "876d2525e17a4036902a2d9f29fb5837";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector(".tempNow");
  showTemperature.innerHTML = temperature;
  let tempMax = Math.round(response.data.main.temp_max);
  let showTemperatureMax = document.querySelector(".tempNowHigh");
  showTemperatureMax.innerHTML = tempMax;
  let tempMin = Math.round(response.data.main.temp_min);
  let showTemperatureMin = document.querySelector(".tempNowLow");
  showTemperatureMin.innerHTML = tempMin;
  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = humidity;
  let description = response.data.weather[0].description;
  let showDescription = document.querySelector(".descriptionNow");
  showDescription.innerHTML = description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "876d2525e17a4036902a2d9f29fb5837";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "876d2525e17a4036902a2d9f29fb5837";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".buttonCurrentLocation");
button.addEventListener("click", getCurrentPosition);

search("Paris");
