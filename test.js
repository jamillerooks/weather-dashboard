var dateEl = document.querySelector('#date');
var dayEl = document.querySelector('.day');
var cityInputEl = document.getElementById('#city-input');
var citySearchHistoryEl = document.querySelector('#city-search-history');
var currentPictureEl = document.querySelector('#current-picture');
//var weatherForecastEl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var uvIndexEl = document.querySelector('#uvIndex');
var uvColorEl = document.querySelector('#uv-color');
var searchHistory = [];


var searchHistory = [];
var api = {
  key: "6adbeffd52b6bf558ada7f0bafb51e52",
  base: "https://api.openweathermap.org/data/2.5/"
}

var searchBox = document.querySelector('#city-input');
searchBtn.addEventListener('click',  setQuery);
function useSearchHistory(e) {
  if (!e.target.matches("button.history")) {
    return;
  };
  var btn = e.target;
  var search = btn.getAttribute("data-search");
  getLatLon(search);
};


function setQuery(evt){
 getResults(searchBox.value);
  }

function getResults(query){
  fetch(`${api.base}weather?q=${query}&lat={lat}&lon={lon}&units=imperial&APPID=${api.key}`)
  .then(weather =>{
    return weather.json();
  }) .then(displayResults);
    getForecast();
}
  
//Populate data in the side panel
function displayResults(weather){
  //City
  console.log(weather);
  let city = document.querySelector('#city-name');
  city.innerText =`${weather.name}`;

  //Date
  let date = document.querySelector('#date');
  var current = $.now();
  var maxDate = new Date(current);
  var currentDate =maxDate.toString();
  date.innerHTML = (currentDate);

  //Temp
  let temp = document.querySelector('#current-temp');
  temp.innerHTML = `<span> Temp </span>${Math.round(weather.main.temp)}<span>℉</span>`;

  //Humidity
  let humidity = document.querySelector('#current-humidity');
  humidity.innerHTML = `<span> Humidity </span>${weather.main.humidity}<span>%</span>`;
  
   //Wind
   let wind = document.querySelector('#current-wind');
   wind.innerHTML = `<span> Wind </span>${Math.round(weather.wind.speed)}<span>%</span>`;

  //weather Symbol
  let weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  weatherIcon.setAttribute = ("src", weatherIcon)

  var uvIndexEl = document.querySelector('#uvIndex');
 uvIndexEl.innerHTML = weather.uvi;

  //Local Storage
  
  function historyButtons() {
    var citySearchHistoryEl = document.getElementById('city-search-history');
    citySearchHistoryEl.innerHTML = "";
    //
    for (var i = city-search-history.length - 1; i >= city-search-history.length - 5; i--) {
        if (i < 0){
          return;
        };

        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "history");
        var space = document.createElement("br");
        btn.setAttribute("data-search", city-search-history[i]);
        // console.log(city-search-history[i]);
        btn.textContent = city-search-history[i];
        citySearchHistoryEl.append(btn);
        citySearchHistoryEl.append(space);

    };
};
createHistory();
function createHistory() {
  var savedHistory = localStorage.getItem("searchHistory");
  console.log(savedHistory);
  if (savedHistory) {
      searchHistory = JSON.parse(savedHistory);
      
  };
  // call to generate search history buttons
 
  historyButtons();
 
}};
searchHistoryButts.addEventListener("click", useSearchHistory);

