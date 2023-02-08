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

function displayTemperature(response) {
    console.log(response);
    document.querySelector("#country").innerHTML = response.data.sys.country;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector(".description").innerHTML = response.data.weather[0].main;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#today").innerHTML = formatDay(response.data.dt * 1000);
    document.querySelector("#time").innerHTML = formatTime(response.data.dt * 1000);
}

let apiKey = "203fa770242fcd2b9555d832a88ea567";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);