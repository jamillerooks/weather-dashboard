//Obtain the API key from OpenWeatherMap and use it in the fetch request
var apiKey = '6adbeffd52b6bf558ada7f0bafb51e52';

//Compile a list of DOM elements for easy access in writing functions
var dateEl = document.querySelector('#date');
var dayEl = document.querySelector('.day');
var cityInputEl = document.getElementById('city-input');
var cityHistoryEl = document.getElementById('city-search-history');
var searchBtn = document.getElementById('searchBtn');
var citySearchHistoryEl = document.querySelector('#searchesHistory');
var currentPictureEl = document.querySelector('#current-picture');
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var uvIndexEl = document.querySelector('#uvIndex');
var uvColorEl = document.querySelector('#uv-color');
var currentWeatherItemsEl = document.getElementById('current-weather-items');

//This request provides data needed to populate the current weather condition.
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

//This request provides data needed for the uv-index and the 5-Day forecast.
function getWeather(lat, lon, city) {
	var oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	fetch(oneCallURL)
		.then((response) => response.json())
		.then((data) => {
			buildHistory();
			console.log('data +++', data);

			//Calculate the current date using JavaScript built-in functions.
			let date = document.querySelector('#date');
			var current = $.now();
			var maxDate = new Date(current);
			var currentDate = maxDate.toString();
			date.innerHTML = currentDate;

			//Use the OpenWeatherMap link to import the weather icon into the weather dashboard.
			var weatherIcon = data.current.weather[0].icon;
			var currentIcon = document.getElementById(`weatherIcon`);
			currentIcon.setAttribute(
				'src',
				`https://openweathermap.org/img/w/${weatherIcon}.png`
			);

			//Search the data collected from the fetch call to get the temp, wind, humidity and uv-index for the current weather.
			//Temp
			var temp = document.getElementById('current-temp');
			temp.innerHTML = `<span> Temp </span>${Math.round(
				data.current.temp
			)}<span>℉</span>`;

			//Wind
			var wind = document.getElementById('current-wind');
			wind.innerHTML = `<span> Wind </span>${Math.round(
				data.current.wind_speed
			)}<span> mph</span>`;

			//Humidity
			var humidity = document.getElementById('current-humidity');
			humidity.innerHTML = `<span> Humidity </span>${data.current.humidity}<span>%</span>`;
			cityName = document.getElementById('cityName');
			cityName.innerHTML = city;

			//uv-Index
			var uv = data.current.uvi;
			var uvColor = document.getElementById('uv-color');
			uvColor.innerHTML = 'UV Index: ' + uv;

			//Change the uv-index color ---text to reflect criteria
			if (uv < 3) {
				uvColor.setAttribute('class', 'uvcard green');
			} else if (uv > 6) {
				uvColor.setAttribute('class', 'uvcard yellow');
			} else if (uv < 8) {
				uvColor.setAttribute('class', 'uvcard orange');
			} else {
				uvColor.setAttribute('class', 'uvcard red');
			}

			//5-Day Forecast
			//Date using Moment API
			for (var i = 1; i < 6; i++) {
				console.log('moment +++', moment);
				console.log('data.daily[i - 1].dt +++', data.daily[i - 1].dt);
				var day = document.getElementById(`day${i}`);
				day.innerHTML = moment.unix(data.daily[i - 1].dt).format('MM/DD/YYYY');

				//5-Day Temp
				var dayTemp = document.getElementById(`day${i}Temp`);
				dayTemp.innerHTML = `<span> Temp </span>${Math.round(
					data.daily[i - 1].temp.day
				)}<span>℉</span>`;

				//5-Day Humidity
				var dayHumidity = document.getElementById(`day${i}Humidity`);
				dayHumidity.innerHTML = `<span> Humidity </span>${
					data.daily[i - 1].humidity
				}<span>%</span>`;

				//5-Day Wind
				var dayWind = document.getElementById(`day${i}Wind`);
				dayWind.innerHTML = `<span> Wind </span>${Math.round(
					data.daily[i - 1].wind_speed
				)}<span> mph</span>`;

				//5-Day Weather icons
				var dayIcon = document.getElementById(`day${i}Icon`);
				dayIcon.setAttribute(
					'src',
					`https://openweathermap.org/img/w/${
						data.daily[i - 1].weather[0].icon
					}.png`
				);
			}
		});
}

//The last 5 city searches are saved to local storage and displayed on the screen
buildHistory();

function buildHistory() {
	cityHistoryEl.innerHTML = '';
	var cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];

	//Search buttons are created for each city
	if (cityHistory.length == 0) {
		var newLi = document.createElement('li');
		newLi.textContent = 'No History available right now';
		cityHistoryEl.append(newLi);
		return;
	}

	for (j = 0; j < cityHistory.length; j++) {
		var newBtn = document.createElement('button');
		newBtn.innerHTML = cityHistory[j];
		newBtn.id = `newBtn${j}`;
		// newBtn.addEventListener = function () {
		// 	console.log('new button click +++', textVal, newBtn.innerText);
		// 	document.getElementById('city-input').value = textVal;
		// 	searchCoordinates(newBtn.innerText);
		// 	return false;
		// };

		cityHistoryEl.append(newBtn);
	}
	for (let index = 0; index < cityHistory.length; index++) {
		var idStr = '#newBtn' + index;
		$(idStr).on('click', function (event) {
			event.preventDefault();
			city = $(this).text().toUpperCase();
			console.log('event click +++', city);
			searchCoordinates(city);
		});
	}
}
//Search history is saved to Local Storage
function saveToLocal() {
	var searches = [];
	if (localStorage.getItem('cityHistory')) {
		searches = JSON.parse(localStorage.getItem('cityHistory'));
	}

	searches.push(cityInputEl.value);
	var uniqueStr = [...new Set(searches)];
	localStorage.setItem('cityHistory', JSON.stringify(uniqueStr));
}

searchBtn.addEventListener('click', function (event) {
	event.preventDefault();
	var cityToSearch = cityInputEl.value;
	searchCoordinates(cityToSearch);
	saveToLocal();
});
