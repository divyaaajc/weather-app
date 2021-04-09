const openWeatherKey = "f34fea1868b65e3eabf3b0f5e16e41a7";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", function(key) {
    if (key.keyCode === 13 ){
        getWeather(searchBox.value).then(displayResults);
    }
})



const getWeather = async() => {
    const cityName = await searchBox.value;
    const weatherCall = openWeatherUrl + "?q=" + cityName + "&units=metric&appid=" + openWeatherKey;
    try {
        const response = await fetch(weatherCall);
        if (response.ok){
            jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(error) {
        console.log(error);
    }
}

const displayResults = (weather) => {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".weather .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}°C`;

    let sky = document.querySelector(".weather .sky");
    sky.innerText = weather.weather[0].main;

    let hiLow = document.querySelector(".hi-low");
    hiLow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}




