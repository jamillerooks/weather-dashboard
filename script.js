//DOM Elements

var dateEl = document.querySelector('#date');
var dayEl = document.querySelector('.day');
var cityInputEl = document.getElementById('#city-input');
var searchBtn = document.querySelector('#searchBtn');
var citySearchBtn = document.querySelector('#city-search-history');
var currentPictureEl = document.querySelector('#current-picture');
//var weatherForecastEl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var uvIndexEl = document.querySelector('#uvIndex');
var uvColorEl = document.querySelector('#uv-color');
var searchHistory = [];

var apiKey = "6adbeffd52b6bf558ada7f0bafb51e52";
var apiUrl = "https://api.openweathermap.org";

//Current Weather Section
function getCurrentWeather(city, weather, time){
  var dateEl = document.querySelector('#date');
  dateEl.textContent = date;
  var date = dayjs().tz(time).format("M/D/YYYY");
  cityName.innerHTML= city;
  var currentPictureEl = document.querySelector('#current-picture');
  currentPictureEl.setAttribute("src", weatherIcon);
  var temp = document.querySelector('#current-temp');
  temp.innerHTML = `<span> Temp </span>${Math.round(weather.temp)}<span>℉</span>`;
  var wind = document.querySelector('#current-wind');
  wind.innerHTML = `<span> Wind </span>${Math.round(weather.wind.speed)}<span>%</span>`;
  var humidity = document.querySelector('#current-humidity');
  humidity.innerHTML = `<span> Humidity </span>${weather.main.humidity}<span>%</span>`;
  var uvIndexEl = document.querySelector('#uvIndex');
  uvIndexEl.innerHTML = weather.uvi;
  var uvColorEl = document.querySelector('#uv-color');

  if (weather.uvi < 3){
    uvColorEl.setAttribute("class", "uvCard green");
  } else if (weather.uvi < 6){
    uvColorEl.setAttribute("class", "uvCard yellow");
  } else if (weather.uvi < 8){
    uvColorEl.setAttribute("class", "uvCard orange");
  } else{
    uvColorEl.setAttribute("class", "uvCard red");
  };

  //5 Day Forecast Section
  function get5DayForecast(daily, time){
    var day1 = dayjs().tz(time).add(1, "day").startOf("day").unix();
    var day5 = dayjs().tz(time).add(6, "day").startOf("day").unix();

    for (var i = 0; i < daily.length; i++) {
      if (daily[i].dt >= day1 && daily[i].dt < day5) {
          var tStamp = daily[i].dt;
          var day = dayjs.unix(tStamp).tz(time).format("M/D/YYYY");
          date.innerHTML = day;
          var date = document.getElementById(`day${i}`); 
          var dayIcon = document.getElementById(`day${i}Icon`);
          dayIcon.setAttribute("src", weatherIcon);
          var dayTemp = document.getElementById(`day${i}Temp`);
          dayTemp.innerHTML = daily[i].temp.max;
          var dayWind = document.getElementById(`day${i}Wind`);
          dayWind.innerHTML = daily[i].wind_speed;
          var dayHumidity = document.getElementById(`day${i}Humidity`);
          dayHumidity.innerHTML = daily[i].humidity;
          
          var weatherIcon = `https://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;


      };
  };
};

// API Section from Open openweathermap.org

  }
  
  
  
  
