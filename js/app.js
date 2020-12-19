if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(getPosition)
}
else{
    alert('Geolocation not supported by your browser')
}

function getPosition(position) {
    computeCity(position.coords.latitude, position.coords.longitude)
}

//using opencage API's data which will tell us about the city name from coordinates
function computeCity(lati, long){
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lati}+${long}&key=7d0266b0bdde4185b5fb4a9bbf45de2a`)
        .then(res => res.json())
        .then((location) => {
            getWeatherDetails(location.results[0].components.state_district)
        })
        .catch(() => {
            alert('Error reported from server, maybe try later?')
        })
}

//using openweathermap API to get weather related things
function getWeatherDetails(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=946c870db6ca82b017d54a8aa62c349a`)
    .then(weatherObj => weatherObj.json())
    .then((weatherData) => {
        printData(weatherData.name, weatherData.main.temp, weatherData.main.feels_like, weatherData.weather[0].main, weatherData.main.humidity, weatherData.main.temp_min, weatherData.main.temp_max, weatherData.sys.sunrise, weatherData.sys.sunset)
    })
    .catch((err) => {
        alert('Server error:', err)
    })
}

function printData(cityName, temp, feels_like, weather, humidity, minTemp, maxTemp, sunR, sunS){
    var city = document.querySelector('#ctyNm')
    city.innerText = cityName

    var mainTemp = document.querySelector('.temp h1')
    mainTemp.innerText = `${temp}°C`

    var feelsLike = document.querySelector('#feels-like')
    feelsLike.innerText = ` ${feels_like}°C`

    var weath = document.querySelector('#weather')
    weath.innerText = weather
    
    var humid = document.querySelector('#humid')
    humid.innerText = ` ${humidity}%`

    var minT = document.querySelector('#minT')
    minT.innerText = ` ${minTemp}°C`

    var maxT = document.querySelector('#maxT')
    maxT.innerText = ` ${minTemp}°C`

    var sunrise = document.querySelector('#sunrise')
    sunrise.innerText = ` ${convertUnix(sunR)}`

    var sunset = document.querySelector('#sunset')
    sunset.innerText = ` ${convertUnix(sunS)}`
}

function convertUnix(unixTimestamp){
    dateObj = new Date(unixTimestamp * 1000)
    utcString = dateObj.toUTCString()
    time = utcString.slice(-11, -4)
    return time
}

var cityFrom = document.querySelector('.city-form')
var findCity = document.querySelector('.find-city')
var content = document.querySelector('.content')
var cont = document.querySelector('.container')
var chngCty = document.querySelector('#mycity')
chngCty.addEventListener('click', () => {
    
    cont.classList.add('display-off')

    content.classList.add('display-off')
   
    findCity.classList.add('display-off')
    
    cityFrom.classList.add('display-on')

    var form = document.querySelector('form')
    form.addEventListener('submit', getCityFromUser)
})

function getCityFromUser(e) {
    e.preventDefault()
    var cityIs = document.querySelector('input').value
    
    cont.classList.remove('display-off')

    content.classList.remove('display-off')

    findCity.classList.remove('display-off')

    cityFrom.classList.remove('display-on')

    getWeatherDetails(cityIs)
}