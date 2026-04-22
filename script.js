const apiKey = "ca9990f347d33a37418116eefc416ce6"; // 👉 OpenWeather API


navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCoords(lat, lon);
}

function error() {
    getWeather("Lahore"); // fallback
}


function searchWeather() {
    let city = document.getElementById("searchInput").value;
    getWeather(city);
}

async function getWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    let res = await fetch(url);
    let data = await res.json();
    updateUI(data);
}


async function getWeatherByCoords(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    let res = await fetch(url);
    let data = await res.json();
    updateUI(data);
}

function updateUI(data) {
    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("feels").innerText = "Feels like: " + data.main.feels_like + "°C";
    document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
    document.getElementById("wind").innerText = "Wind: " + data.wind.speed + " km/h";

    let iconCode = data.weather[0].icon;
    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


    let isDay = iconCode.includes("d");
    let app = document.getElementById("app");

    app.classList.remove("day", "night");
    app.classList.add(isDay ? "day" : "night");


    let now = new Date();
    document.getElementById("date").innerText = now.toLocaleString();
}