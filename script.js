var apiKey = '6adbeffd52b6bf558ada7f0bafb51e52';

var dateEl = document.querySelector('#date');
var dayEl = document.querySelector('.day');
var cityInputEl = document.getElementById('city-input');
var cityHistoryEl = document.getElementById('city-search-history');
var searchBtn = document.getElementById('searchBtn');
var citySearchHistoryEl = document.querySelector('#searchesHistory');
var currentPictureEl = document.querySelector('#current-picture');
//var weatherForecastEl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
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
			console.log(data);
			getWeather(data.coord.lat, data.coord.lon);
		});
}

function getWeather(lat, lon) {
	var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	fetch(oneCallURL)
		.then((response) => response.json())
		.then((oneCallData) => {
			console.log(oneCallData);
			buildHistory();
		});
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

searchBtn.addEventListener('click', function () {
	var cityToSearch = cityInputEl.value;
	searchCoordinates(cityToSearch);
	saveToLocal();
});
buildHistory();
currentWeather();

function currentWeather(city, weather, time) {
	let date = document.querySelector('#date');
	var current = $.now();
	var maxDate = new Date(current);
	var currentDate = maxDate.toString();
	date.innerHTML = currentDate;
	var weatherIcon = data.weather[0].icon;
	weatherIcon.setAttribute =
		('src', `https://openweathermap.org/img/w/${weatherIcon}.png`);
	var temp = document.getElementById('current-temp');
	temp.innerHTML = `<span> Temp </span>${Math.round(
		data.coord.weather.main.temp
	)}<span>℉</span>`;
	var wind = document.getElementById('current-wind');
	wind.innerHTML = `<span> Wind </span>${Math.round(
	data.coord.weather.wind.speed
	)}<span>mph</span>`;
	var humidity = document.getElementById('current-humidity');
	humidity.innerHTML = `<span> Humidity </span>${data.coord.weather.main.humidity}<span>%</span>`;
	var uv = document.getElementById('uvIndex');
	var uvColor = document.getElementById('uv-color');
	cityName = document.getElementById('cityName');
	cityName.innerHTML = city;
	todayIcon.setAttribute('src', weatherIcon);

	uv.innerHTML = data.daily.uvi.uvi;

	if (data.daily.uvi < 3) {
		uvcolor.setAttribute('class', 'uvcard green');
	} else if (data.daily.uvi < 6) {
		uvColor.setAttribute('class', 'uvcard yellow');
	} else if (data.daily.uvi < 8) {
		uvColor.setAttribute('class', 'uvcard orange');
	} else {
		uvColor.setAttribute('class', 'uvcard red');
	}

	console.log(city);
	console.log(date);
	console.log(weather.temp);
	console.log(weather.wind_speed);
	console.log(weather.humidity);
	console.log(weather.uvi);
}
