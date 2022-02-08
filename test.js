
var apiKey = "6adbeffd52b6bf558ada7f0bafb51e52"
function getInfo(){
  setQuery()
  
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=&units=imperial&APPID=${apiKey}`
.then(response => response.json())
.then(data =>{
  for(i=0;i<5;i++){
    document.getElementById("day" +(i+1) +"Temp").innerHTML ="Temp:" + Number(data.list[i].main.temp).toFixed(1)+"℉";
  }
  for(i=0;i<5;i++){
    document.getElementById("day" +(i+1) +"Wind").innerHTML ="Wind:" + Number(data.list[i].wind.speed).toFixed(1);
  }
  for(i=0;i<5;i++){
    document.getElementById("day" +(i+1) +"Humidity").innerHTML ="Humidity:" + Number(data.list[i].wind.speed).toFixed(1)+"%";
  }
  for(i=0;i<5;i++){
    document.setAttribute("img" +(i+1)).src="https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
  }
  

  const d = new Date();
  function CheckDay(day){
    if(day +d.getDay() > 6){
      return day +d.getDay()-7;
    }
    else{
      return day +d.getDay();
}
  
}
for(i=0;i<5;i++){
  document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}


})
)






//DOM Elements

var dateEl = document.querySelector('#date');
var dayEl = document.querySelector('.day');
var cityInputEl = document.getElementById('city-input');
var searchBtn = document.getElementById('searchBtn');
var citySearchBtn = document.querySelector('#city-search-history');
var currentPictureEl = document.querySelector('#current-picture');
var weatherForecastEl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
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
function getCitySearch(cityEl) {
  //console.log(cityEl);
  var lat = cityEl.lat;
  var lon = cityEl.lon;
  var city = cityEl.name;
  
  var url = `${apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${api.key}`;
  
  fetch(url)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          getCurrentWeather(city, data.current, data.timezone);
          get5DayForecast(data.daily, data.timezone);
        });
    
};
function getGeo(search) {
  var url = apiUrl + "/geo/1.0/direct?q="+ search + "&limit=5&appid=" + apiKey;
      fetch(url)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              if (!data[0]) {
                console.log("City not found");
              } else {
                addToHistory(search)
                getCitySearch(data[0]);
                return;
              }
          })
 
        
          var current = document.getElementById("current");
          current.removeAttribute("class", "current-weather-items");
};
  
function searchCity(e){
          
  if (!cityInputEl.value) {
      return;
  };
  e.preventDefault();      
  var search = cityInputEl.value.trim();
  getGeo(search);
  cityInputEl.value = "Enter city name...";

  
};

function captureSearchHistory(e) {
  if (!e.target.matches("button.history")) {
    return;
  };
  var btn = e.target;
  var search = btn.getAttribute("data-search");
  getGeo(search);
};

function addToHistory(search) {
  searchHistory.push(search);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  console.log(searchHistory);
  historyButtons();
};

function historyButtons() {
  let historySec = document.getElementById("searchHistory");
  historySec.innerHTML = "";
  //
  for (var i = searchHistory.length - 1; i >= searchHistory.length - 5; i--) {
      if (i < 0){
        return;
      };

      var btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.setAttribute("class", "history");
      var space = document.createElement("br");
      btn.setAttribute("data-search", searchHistory[i]);
      // console.log(searchHistory[i]);
      btn.textContent = searchHistory[i];
      historySec.append(btn);
      historySec.append(space);

  };
};

function saveHistory() {
  var savedHistory = localStorage.getItem("searchHistory");
  console.log(savedHistory);
  if (savedHistory) {
      searchHistory = JSON.parse(savedHistory);
  };
  
  historyButtons();
};



saveHistory();
searchBtn.addEventListener('click', searchCity )
citySearchBtn.addEventListener('click', captureSearchHistory)};



for (i = 0; i < 6; i++) {
    let date = new Date(data.daily[i + 1].dt * 1000).toLocaleString();
    date.innerHTML = day;
            //var dayIcon = document.getElementById(`day${i}Icon`);
            dayIcon.setAttribute("src", weatherIcon);
            var dayTemp = document.getElementById(`day${i}Temp`);
            dayTemp.innerHTML = data.daily[i].temp.max;
            var dayWind = document.getElementById(`day${i}Wind`);
            dayWind.innerHTML = data.daily[i].wind_speed;
            var dayHumidity = document.getElementById(`day${i}Humidity`);
            dayHumidity.innerHTML = data.daily[i].humidity;
            let dayIcon = data.daily[i].weather[0].icon;
            dayIcon.setAttribute("src", weatherIcon);
    
    
    
  }

  let lat = localStorage.getItem("lat");
let lon = localStorage.getItem("lon");


http://api.openweathermap.org/data/2.5/forecast?q=Atlanta}&appid={6adbeffd52b6bf558ada7f0bafb51e52}


var lat;
var lon;
var searches = [];

// I need to add the storage functiona dn click event
var saveSearches = function() {
  localStorage.setItem("searches", JSON.stringify(searches));
};

// Load searches from local storage
var loadSearches = function() {
  searches = JSON.parse(localStorage.getItem("searches"));

  if (!searches) {
    searches = [];
  }

  for (var i = 0; i < searches.length; i++) {
    var searchItem = $("<li>")
      .addClass("list-group-item")
      .text(searches[i]);

    $(".list-group").prepend(searchItem);
  }
};

loadSearches();
// If search button is clicked add new list item element with name of searched city
$("#searchBtn").click(function(event) {
  displayWeatherInfo($("#city").val());
  searches.push($("#city").val());
  var searchItem = $("<li>")
    .addClass("list-group-item")
    .text($("#city").val());
  
  $(".list-group").prepend(searchItem);
  saveSearches();
});

$(".list-group").on("click", "li", function () {
  displayWeatherInfo($(this).text())
});

var displayWeatherInfo = function(city) {

  var apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1";
  
  // get today's weather data
  fetch(apiWeather).then(function (response) {
    // successful?
    if (response.ok) {
      response.json().then(function (weatherData) {
        console.log(weatherData);
        lat = weatherData.coord.lat;
        lon = weatherData.coord.lon;

        // Update the day
        var dateAndTime = weatherData.name + " " + moment().format("(M/D/YYYY)");
        $("#city-name").html(dateAndTime + "<img src='http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png'>");

        var temperature = "Temperature: " + weatherData.main.temp + "°F";
        $("#temperature").text(temperature);

        var humidity = "Humidity: " + weatherData.main.humidity + "%";
        $("#humidity").text(humidity);

        var windSpeed = "Wind Speed: " + weatherData.wind.speed + " mph";
        $("#wind-speed").text(windSpeed);

        var onecallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1";

        var uvAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=" + weatherData.coord.lat + "&lon=" + weatherData.coord.lon + "&appid=184b90f195e0b6670ef9fee34b9291e1";

        // 5 day forcast
        fetch(onecallURL).then(function(response) {
          // successful?
          if (response.ok) {
            response.json().then(function (forecastData) {
              for (var i = 1; i <= 5; i++) {
                dayId = "#day" + (i);
                $(dayId).find("h3").text(moment.unix(forecastData.daily[i].dt).format("M/D/YYYY"));
                $(dayId).find("img").attr("src", "http://openweathermap.org/img/wn/" + forecastData.daily[i].weather[0].icon + "@2x.png");
                $(dayId).find(".temp").text("Temp: " + forecastData.daily[i].temp.day + " F°");
                $(dayId).find(".humid").text("Humidity: " + forecastData.daily[i].humidity + "%");
              }
            });
          }
        });
        
        // uv data and display
        fetch(uvAPI).then(function(response) {
          if (response.ok) {
            response.json().then(function (uvData) {
              var uvIndex = uvData.value;
                if (uvIndex >= 8) {
                  $("#uv-index").html("UV Index: <span class='bg-danger'>" + uvIndex + "</span>");
                } else if (uvIndex >= 3) {
                  $("#uv-index").html("UV Index: <span class='bg-warning'>" + uvIndex + "</span>");
                } else {
                  $("#uv-index").html("UV Index: <span class='bg-success'>" + uvIndex + "</span>");
                }
            });
          }
        });
      });
    }
  });
};

