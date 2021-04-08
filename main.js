const openWeatherKey = "f34fea1868b65e3eabf3b0f5e16e41a7";
const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const render = document.getElementById("show");


const getWeather = async() => {
    const cityName = document.querySelector("#location").value;
    const weatherCall = openWeatherUrl + "?q=" + cityName + "&appid=" + openWeatherKey;
    try {
        const response = await fetch(weatherCall);
        if (response.ok){
            jsonResponse = await response.json();
            return jsonResponse;
        };
    } catch(error) {
        console.log(error);
    }
}





