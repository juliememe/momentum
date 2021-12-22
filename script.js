//DOM Elements
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const day = document.querySelector(".day");
const blockquote = document.querySelector(".blockquote");
const figcaption = document.querySelector(".figcaption");
const btn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherHumidity = document.querySelector(".weather-humidity");
const weatherWind = document.querySelector(".weather-wind");
const city = document.querySelector(".city");
const bgBack = document.querySelector(".bg_back");
const bgForward = document.querySelector(".bg_forward");

const PICTURES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
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

let listOfBackgrounds = [];
const base = "./assets/images/";
const timesOfDayNames = ["night", "morning", "day", "evening"];
let nowTime = new Date();
let i = nowTime.getHours() % 6;
let partOfDay =
  nowTime.getHours() < 6
    ? 0
    : nowTime.getHours() < 12
    ? 1
    : nowTime.getHours() < 18
    ? 2
    : 3;

function showTimeAndDate() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let dayNumber = today.getDate();
  let monthNumber = today.getMonth();
  let dayOfWeeK = today.getDay();

  time.innerHTML = `${hour}<span> : </span>${addZero(min)}<span> : </span>${addZero(sec)}`;
  day.innerHTML = `${week[dayOfWeeK]}, ${dayNumber} ${month[monthNumber]}`;

  if (!(hour % 6) && min === 0 && sec === 0) {
    setGreeting();
  }

  if (min === 0 && sec === 0) {
    getImage(i++ % 6); //когда время равно по нулям -меняем бек (мин и сек)
  }

  if (hour === 0 && min === 0 && sec === 0) {
    creatListOfBackgrounds();
  }

  setTimeout(showTimeAndDate, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function getName() {
  if (
    localStorage.getItem("name") === null ||
    localStorage.getItem("name").trim() === ""
  ) {
    name.textContent = "[Enter name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (e.target.innerText.trim() !== "") {
        localStorage.setItem("name", e.target.innerText);
      } else {
        getName();
      }
      name.blur();
    }
  } else {
    if (e.target.innerText.trim() !== "") {
      localStorage.setItem("name", e.target.innerText);
    } else getName();
  }
}

function cleanField(e) {
  e.target.innerText = "";
}

function getFocus() {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus").trim() === ""
  ) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (e.target.innerText.trim() !== "") {
        localStorage.setItem("focus", e.target.innerText);
      } else {
        getFocus();
      }
      focus.blur();
    }
  } else if (e.target.innerText.trim() !== "") {
    localStorage.setItem("focus", e.target.innerText);
  } else getFocus();
}

async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();

  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}

function getCity() {
  if (
    localStorage.getItem("city") === null ||
    localStorage.getItem("city").trim() === ""
  ) {
    city.textContent = "[Enter city]";
  } else {
    city.textContent = localStorage.getItem("city");
  }
}

function setCity(e) {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      if (e.target.innerText.trim() !== "") {
        localStorage.setItem("city", e.target.innerText);
      } else {
        getCity();
      }
      city.blur();
    }
  } else if (e.type === "blur") {
    if (e.target.innerText.trim() !== "") {
      localStorage.setItem("city", e.target.innerText);
    } else {
      getCity();
    }
    getWeather();
  }
}

async function getWeather() {
  if (
    localStorage.getItem("city") === null ||
    localStorage.getItem("city").trim() === "" ||
    localStorage.getItem("city").trim() === "[Enter city]"
  ) {
    return;
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent.trim()}&lang=eng&appid=141431df3fb241dba950c9a85361a5ee&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      weatherIcon.className = "weather-icon owf";
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;

      weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherWind.textContent = `Wind speed: ${data.wind.speed}m/c`;
    } catch (e) {
      if (localStorage.getItem("city").trim() !== "[Enter city]") {
        alert("This city doesn't exist");
        temperature.innerText = "";
        weatherHumidity.innerText = "";
        weatherWind.innerText = "";
        weatherIcon.className = "weather-icon owf owf";
        localStorage.setItem("city", "[Enter city]");
        city.innerText = "[Enter city]";
      }
    }
  }
}

function setGreeting() {
  let today = new Date();
  hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    greeting.textContent = "Good Morning, ";
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = "Good Afternoon,";
  } else if (hour >= 18 && hour < 24) {
    greeting.textContent = "Good Evening,";
  } else {
    greeting.textContent = "Good Night,";
  }

  getImage(i);
 
}

function viewBgImage(data) {
  const body = document.querySelector("body");
  const src = data;
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`; //создаем картинку такую же как была
  };
}

function creatListOfBackgrounds() {
  listOfBackgrounds = [];
  for (let i = 0; i < 4; i++) {
    let arr = [];
    for (let j = 0; j < 6; j++) {
      arr.push(
        Math.floor(1 + Math.random() * (PICTURES.length + 1 - 1)) %
          PICTURES.length
      );
    }
    listOfBackgrounds.push(arr);
  }
}

function getImage(number) {
  if (listOfBackgrounds.length < 1) creatListOfBackgrounds();
  let index = listOfBackgrounds[partOfDay][number];
  const imgSrc = base + timesOfDayNames[partOfDay] + "/" + PICTURES[index];
  viewBgImage(imgSrc);
}

function nextImage() {
  i++;
  if (i > 5) {
    i = 0;
    partOfDay++;
    if (partOfDay > 3) partOfDay = 0;
  }
  getImage(i);
}

function prevImage() {
  i--;
  if (i < 0) {
    i = 5;
    partOfDay--;
    if (partOfDay < 0) partOfDay = 3;
  }
  getImage(i);
}

bgBack.addEventListener("click", prevImage);
bgForward.addEventListener("click", nextImage);
document.addEventListener("DOMContentLoaded", getWeather);
city.addEventListener("keypress", setCity);
city.addEventListener("focus", cleanField);
city.addEventListener("blur", setCity);
document.addEventListener("DOMContentLoaded", getQuote);
btn.addEventListener("click", getQuote);
name.addEventListener("focus", cleanField);
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("focus", cleanField);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

showTimeAndDate();
setGreeting();
getName();
getFocus();
getQuote();
getCity();
