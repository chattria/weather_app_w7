const blueBtn = document.querySelector("#blue-screen");
const whiteBtn = document.querySelector("#console");

blueBtn.addEventListener("click", () => {
    document.documentElement.style.setProperty('--first-background-color', '#0007C9');
    document.documentElement.style.setProperty('--first-text-color', '#fff');
    document.documentElement.style.setProperty('--first-shadow', '1px 1px 2px #fff', '0 0 0.1rem #fff', '0 0 0.1rem #fff');
    document.documentElement.style.setProperty('--border-btn', '1px solid #fff');
    document.documentElement.style.setProperty('--border', '2px solid #fff');
    document.documentElement.style.setProperty('--second-background-color', '#fff');
    document.documentElement.style.setProperty('--second-text-color', '#0007C9');
    document.documentElement.style.setProperty('--second-shadow', '1px 1px 2px  #0007C9', '0 0 0.1rem  #0007C9', '0 0 0.1rem  #0007C9');
});

whiteBtn.addEventListener("click", () => {
    document.documentElement.style.setProperty('--first-background-color', '#000000');
    document.documentElement.style.setProperty('--first-text-color', '#fff');
    document.documentElement.style.setProperty('--first-shadow', '1px 1px 2px #fff', '0 0 0.1rem #fff', '0 0 0.1rem #fff');
    document.documentElement.style.setProperty('--border-btn', '1px solid #fff');
    document.documentElement.style.setProperty('--border', '2px solid #fff');
    document.documentElement.style.setProperty('--second-background-color', '#fff');
    document.documentElement.style.setProperty('--second-text-color', '#000000');
    document.documentElement.style.setProperty('--second-shadow', '1px 1px 2px  #000000', '0 0 0.1rem  #000000', '0 0 0.1rem  #000000');
});

//6 day forcast
let dates = new Date();
let shortDays = [
    "SUN",
    "MON",
    "TUS",
    "WED",
    "THU",
    "FRI",
    "SAT"
];

let tomorrow = new Date(dates.getTime() + 24 * 60 * 60 * 1000);
let dayAfterTomorrow = new Date(dates.getTime() + 2 * 24 * 60 * 60 * 1000);
let thirdDay = new Date(dates.getTime() + 3 * 24 * 60 * 60 * 1000);
let fourthDay = new Date(dates.getTime() + 4 * 24 * 60 * 60 * 1000);
let fifthDay = new Date(dates.getTime() + 5 * 24 * 60 * 60 * 1000);
let sixthDay = new Date(dates.getTime() + 6 * 24 * 60 * 60 * 1000);

document.querySelector("#tomorrow").innerHTML = shortDays[tomorrow.getDay()];
document.querySelector("#day-after-tomorrow").innerHTML = shortDays[dayAfterTomorrow.getDay()];
document.querySelector("#third-day").innerHTML =  shortDays[thirdDay.getDay()];
document.querySelector("#fourth-day").innerHTML = shortDays[fourthDay.getDay()];
document.querySelector("#fifth-day").innerHTML = shortDays[fifthDay.getDay()];
document.querySelector("#sixth-day").innerHTML = shortDays[sixthDay.getDay()];


function formatDate(datestamp) {
    let dates = new Date(datestamp);
    let fullYear = dates.getFullYear();
    let months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
    ];
    let month = months[dates.getMonth()];
    if (month < 10) {
        month = `0${month}`;
    }
    let date = dates.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
   return `${fullYear}-${month}-${date}`;
}

function formatDay(daystamp) {
    let dates = new Date(daystamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuseday",
        "Wednesday",
        "Thurseday",
        "Friday",
        "Saturday"
    ];
    let day = days[dates.getDay()];
    return day;
}

function formatTime(timestamp) {
    let dates = new Date(timestamp);
    let hours = dates.getHours();
    let minutes = dates.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
}
    let seconds = dates.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

function displayForcast(response) {
    console.log(response.data);
    document.querySelector("#tom-degree").innerHTML = Math.round(response.data.daily[1].temp.day);
    document.querySelector("#day-degree").innerHTML = Math.round(response.data.daily[2].temp.day);
    document.querySelector("#thi-degree").innerHTML = Math.round(response.data.daily[3].temp.day);
    document.querySelector("#fou-degree").innerHTML = Math.round(response.data.daily[4].temp.day);
    document.querySelector("#fif-degree").innerHTML = Math.round(response.data.daily[5].temp.day);
    document.querySelector("#six-degree").innerHTML = Math.round(response.data.daily[6].temp.day);
}

function getForecast(coordinate) {
    console.log(coordinate);
    let apiKey = "203fa770242fcd2b9555d832a88ea567";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response) {
    celciusTemperature = Math.round(response.data.main.temp);
    lowTemperature = Math.floor(response.data.main.temp_min);
    highTemperature = Math.round(response.data.main.temp_max);

    document.querySelector("#country").innerHTML = response.data.sys.country;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#low").innerHTML = lowTemperature;
    document.querySelector("#high").innerHTML = highTemperature;
    document.querySelector(".description").innerHTML = response.data.weather[0].main;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#temp").innerHTML = celciusTemperature;
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#today").innerHTML = formatDay(response.data.dt * 1000);
    document.querySelector("#time").innerHTML = formatTime(response.data.dt * 1000);

    getForecast (response.data.coord);
}

function search(city) {
    let apiKey = "203fa770242fcd2b9555d832a88ea567";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

//Current button
function showCurrentCity(position) {
    let currentLat = position.coords.latitude;
    let currentLon = position.coords.longitude;
    let apiKey = "203fa770242fcd2b9555d832a88ea567";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function currentLocationButton(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentCity);
}  

function displayFahrenheit(event) {
    event.preventDefault(); 
    let fahrenheitTemperatur = (celciusTemperature * 9) / 5 + 32;
    let temperaturElement = document.querySelector("#temp");
    temperaturElement.innerHTML = Math.round(fahrenheitTemperatur);
    
    let changeFahLow = (lowTemperature *9) / 5 + 32;
    let changeLowTemp = document.querySelector("#low");
    changeLowTemp.innerHTML = Math.floor(changeFahLow); 

    let changeFahHigh = (highTemperature *9) / 5 + 32;
    let changeHighTemp = document.querySelector("#high");
    changeHighTemp.innerHTML = Math.round(changeFahHigh); 

    let fahrentheitUnit = document.querySelectorAll(".unit");
    fahrentheitUnit.forEach(element => element.innerHTML = " ºf");
}

function displayCelcius(event) {
    event.preventDefault();
    let temperaturElement = document.querySelector("#temp");
    temperaturElement.innerHTML = celciusTemperature;

    let changeLowTemp = document.querySelector("#low");
    changeLowTemp.innerHTML = lowTemperature; 

    let changeHighTemp = document.querySelector("#high");
    changeHighTemp.innerHTML = highTemperature; 

    let fahrentheitUnit = document.querySelectorAll(".unit");
    fahrentheitUnit.forEach(element => element.innerHTML = " ºc");
}


let celciusTemperature = null;

let currentLocation = document.querySelector("#current-btn");
currentLocation.addEventListener("click", currentLocationButton);

let form = document.querySelector(".search-city");
form.addEventListener("submit", handleSubmit);

let fahrenheitBtn = document.querySelector("#fah-button"); 
fahrenheitBtn.addEventListener("click", displayFahrenheit);

let celciusBtn = document.querySelector("#cel-button"); 
celciusBtn.addEventListener("click", displayCelcius);

search("Stockholm");