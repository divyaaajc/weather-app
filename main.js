const openWeatherKey = "f34fea1868b65e3eabf3b0f5e16e41a7";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", function(key) {
    if (key.keyCode === 13 ){
        getWeather(searchBox.value).then(displayResults);
    }
});



const getWeather = async() => {
    const cityName = await searchBox.value;
    const weatherCall = openWeatherUrl + "?q=" + cityName + "&units=metric&appid=" + openWeatherKey;
    try {
        const response = await fetch(weatherCall);
        if (response.ok){
            jsonResponse = await response.json();
            return jsonResponse;
            console.log(jsonResponse)
        }
    } catch(error) {
        console.log(error);
    }
}

const displayResults = (weather) => {
    let container = document.querySelector(".weather-card");
    container.style.visibility = "visible";

    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".weather .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}°C`;

    let sky = document.querySelector(".weather .sky");
    sky.innerText = weather.weather[0].description;

    let hiLow = document.querySelector(".hi-low");
    hiLow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

    let icon = document.querySelector(".icon");
    let iconCode = weather.weather[0].icon;
    faIcon = iconsConverter(iconCode);
    icon.innerHTML = `${faIcon}`;
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


const iconsConverter = (iconCode) => {
    let icon = iconCode;
    switch(icon) {
        case("01d"):
            return `<i class="fa fa-sun"></i>`;
            break;
        case("02d"):
            return `<i class="fa fa-cloud-sun"></i>`;
            break;
        case("03d" || "03n"):
            return `<i class="fa fa-cloud"></i>`;
            break;
        case("04d" || "04n"):
            return `<i class="fa fa-cloud-meatball"></i>`;
            break;
        case("09d"):
            return `<i class="fa fa-cloud-sun-rain"></i>`;
            break;
        case("10d" || "10n"):
            return `<i class="fa fa-cloud-rain"></i>`;
            break;
        case("11d" || "11n"):
            return `<i class="fa fa-cloud-showers-heavy bolt"></i>`;
            break;
        case("13d" || "13n"):
            return `<i class="fa fa-snowflake"></i>`;
            break;
        case("50d" || "50n"):
            return `<i class="fa fa-cloud-smog"></i>`;
            break;
        case("01n"):
            return `<i class="fa fa-moon"></i>`;
            break;
        case("02d"):
            return `<i class="fa fa-cloud-moon"></i>`;
            break;
        case("09n"):
            return `<i class="fa fa-cloud-moon-rain"></i>`;
            break;
        default:
            return;
    }
}



