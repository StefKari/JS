
const searchButton = document.querySelector('button');
const searchCity = document.querySelector('#city');

const loading = document.querySelector('#load');
const weatherBox = document.querySelector('#weather');

const weatherTemperature = document.querySelector('#weatherTemperature');
const weatherDescription = document.querySelector('#weatherDescription');
const weatherCity = document.querySelector('#weatherCity');


function Weather(cityName, description) {
  this.cityName = cityName;
  this.description = description;
  this._temperature = '';
}

Object.defineProperty(Weather.prototype, 'temperature', {
  get: function () {
    return this._temperature;
  },
  set: function(value) {
    this._temperature = Math.round(value) + '°C';
  }
});

function updateWeather(weatherData) {
  weatherTemperature.textContent = weatherData._temperature;
  weatherDescription.textContent = weatherData.description;
  weatherCity.textContent = weatherData.cityName;

  loading.style.display = 'none';
  weatherBox.style.display = 'block';
}

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  loading.style.display = 'block';
  weatherBox.style.display = 'none';
  var cityName = searchCity.value;
  if(cityName.trim().length == 0) {
    loading.style.display = 'none';
    return swal({
      title: 'Error!',
      text: 'Please enter your City name!',
      icon: 'error',
      button: 'OK'
    });
  }

  var http = new XMLHttpRequest();
  var apiKey = 'c0a4ea23f485dcf80fc207c0b4edd788';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' +cityName+ '&units=metric&appid=' +apiKey;
  var method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function() {
    if(http.readyState == XMLHttpRequest.DONE && http.status == 200) {
      var data = JSON.parse(http.response);
      var weatherData = new Weather(
        cityName.toUpperCase(),
        data.weather[0].description.toUpperCase()
      );
      weatherData.temperature = data.main.temp;
      updateWeather(weatherData);
    }
    else if(http.readyState === XMLHttpRequest.DONE) {
      swal({
        title: 'Warning!',
        text: 'Something went wrong! Maybe the city you entered does not exist!',
        icon: 'warning',
        button: 'OK'
      });
      loading.style.display = 'none';
    }
  };
  http.send();
}
