var apiKey = '6adbeffd52b6bf558ada7f0bafb51e52';

var dateEl = document.querySelector('#date');
var dayEl = document.querySelector('.day');
var cityInputEl = document.getElementById('city-input');
var cityHistoryEl = document.getElementById('city-search-history');
var searchBtn = document.getElementById('searchBtn');
var citySearchHistoryEl = document.querySelector('#searchesHistory');
var currentPictureEl = document.querySelector('#current-picture');
//var weatherForecastEl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var uvIndexEl = document.querySelector('#uvIndex');
var uvColorEl = document.querySelector('#uv-color');
var currentWeatherItemsEl = document.getElementById('current-weather-items');

function searchCoordinates(city) {
	fetch(
		'http://api.openweathermap.org/data/2.5/weather?q=' +
			city +
			'&appid=' +
			apiKey
	)
		.then((response) => response.json())
		.then((data) => {
		
			getWeather(data.coord.lat, data.coord.lon, city);
		});
}


function getWeather(lat, lon, city) {
	var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	fetch(oneCallURL)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
      let date = document.querySelector('#date');
      var current = $.now();
      var maxDate = new Date(current);
      var currentDate = maxDate.toString();
      date.innerHTML = currentDate;
      var weatherIcon = data.current.weather[0].icon;
      //weatherIcon.setAttribute('src', weatherIcon);
      weatherIcon = ('src', `https://openweathermap.org/img/w/${weatherIcon}.png`);
      var temp = document.getElementById('current-temp');
      temp.innerHTML = `<span> Temp </span>${Math.round(
        data.current.temp
      )}<span>℉</span>`;
      var wind = document.getElementById('current-wind');
      wind.innerHTML = `<span> Wind </span>${Math.round(
        data.current.wind_speed
      )}<span>mph</span>`;
      var humidity = document.getElementById('current-humidity');
      humidity.innerHTML = `<span> Humidity </span>${data.current.humidity}<span>%</span>`;
      cityName = document.getElementById('cityName');
      cityName.innerHTML = city;

      var uv = document.getElementById('uvIndex');
      uv.innerHTML = data.current.uvi;
      var uvColor = document.getElementById('uv-color');
      uvColor.innerHTML = `UV Index: ${uv}`;

      if (uv < 3) {
        uvColor.setAttribute('class', 'uvcard green');
      } else if (uv > 6) {
        uvColor.setAttribute('class', 'uvcard yellow');
      } else if (uv < 8) {
        uvColor.setAttribute('class', 'uvcard orange');
      } else {
        uvColor.setAttribute('class', 'uvcard red');
      }

      for (var i = 0; i < 6; i++) {
        var day = moment.unx(data.daily[i].dt).format('MM/dd/yyyy');
        var dayTemp = data.daily[i].temp.day;
        var dayWind = data.daily[i].wind_speed;
        var dayHumidity = data.daily[i].humidity;
        var dayIcon = data.daily[i].weather[0].icon;
        dayIcon.setAttribute(
          (src = `https://openweathermap.org/img/w/${dayIcon}.png`)
        );
      }

			buildHistory();
		});
	
	// console.log(city);
	//console.log(date);
	// console.log(weather.temp);
	// console.log(weather.wind_speed);
	// console.log(weather.humidity);
	// console.log(weather.uvi);
}


function buildHistory() {
	cityHistoryEl.innerHTML = '';
	var cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];

	if (cityHistory.length == 0) {
		var newLi = document.createElement('li');
		newLi.textContent = 'No History available right now';
		cityHistoryEl.append(newLi);
		return;
	}

	for (i = 0; i < cityHistory.length; i++) {
		var newBtn = document.createElement('button');
		newBtn.textContent = cityHistory[i];
		newBtn.addEventListener('click', function () {
			searchCoordinates(cityHistory[i]);
		});

		cityHistoryEl.append(newBtn);
	}
}

function saveToLocal() {
	var searches = [];
	if (localStorage.getItem('cityHistory')) {
		searches = JSON.parse(localStorage.getItem('cityHistory'));
	}

	searches.push(cityInputEl.value);
	localStorage.setItem('cityHistory', JSON.stringify(searches));
}

searchBtn.addEventListener('click', function (event) {
	event.preventDefault();
	var cityToSearch = cityInputEl.value;
	searchCoordinates(cityToSearch);
	saveToLocal();
});

buildHistory();

// $('.newBtn').on('click', function (event) {
// 	event.preventDefault();
// 	city = $(this).text();
// 	searchCoordinates(city);
// });

