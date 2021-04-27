
today = moment().format("MMM Do YY");
var presentDate = today
var plusOneDay = moment().add(1, "days").format("MMM Do YY");
var plusTwoDays = moment().add(2, "days").format("MMM Do YY")
var plusThreeDays = moment().add(3, "days").format("MMM Do YY")
var plusFourDays = moment().add(4, "days").format("MMM Do YY")
var plusFiveDays = moment().add(5, "days").format("MMM Do YY")


var searchArray = []
$("button").on("click", function () {
    var searchCity = $("#search").val();
    getWeatherByCity(searchCity);
    
    searchArray.push(searchCity);
    $(".search-history").append(searchArray);
    localStorage.setItem("searchMarker", JSON.stringify(searchCity));
    console.log(localStorage);
    saveSearch();
})

function saveSearch() {
   var savedCities = JSON.parse(localStorage.getItem("searchMarker"))||
   searchArray.push(savedCities)
}


// var date = moment();
 function getWeatherByCity(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data)
        var temp = data.list[0].main.temp
        var humidity = data.list[1].main.humidity
        var wind = data.list[0].wind.speed
        var cityName = data.city.name
        // var icon = data.cod.
        // console.log('temp', data.list[0].main.temp);
        // console.log('humidity', data.list[1].main.humidity);
        // console.log('speed', data.list[0].wind.speed);
        // console.log('coords', data.city.coord);
        // put all weather data into the card
        
        //card 0 (CURRENT DAY)
        $(".card0-title").text(`City: ${cityName} (${presentDate})`);
        $(".card0-text0").text(`Temperature: ${temp} °F`);
        $(".card0-text1").text(`Humidity: ${humidity} %`);
        $(".card0-text2").text(`Wind: ${wind} MPH`);
        // card titles & date for 5 day forcast
        $(".card1-title").text(`City: ${cityName} (${plusOneDay})`);
        $(".card2-title").text(`City: ${cityName} (${plusTwoDays})`);
        $(".card3-title").text(`City: ${cityName} (${plusThreeDays})`);
        $(".card4-title").text(`City: ${cityName} (${plusFourDays})`);
        $(".card5-title").text(`City: ${cityName} (${plusFiveDays})`);
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        oneCall(lat,lon);
    })
 }
 

 function oneCall(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
    .then(function (res){
        return res.json();
    }).then (function (data){
        console.log(data)
        var UV = data.current.uvi
        $(".card0-text3").text(`UV Index: ${UV}`);
        // if (UV<=3) {
        //     UV.css("background-color", "green")
        // } else if (UV>3 && UV<6) {
        //     UV.css("background-color", "yellow")
        // } else {
        //     UV.css("background-color", "red")
        // }
        // add uv index to front end and build the 5 day cards

        //card 1 (ONE DAY AFTER)
        var temp = data.daily[1].temp.day;
        var humidity = data.daily[1].humidity
        var wind = data.daily[1].wind_speed
        var uvIndex = data.daily[1].uvi
        $(".card1-text0").text(`Temperature: ${temp} °F`);
        $(".card1-text1").text(`Humidity: ${humidity} %`);
        $(".card1-text2").text(`Wind: ${wind} MPH`);
        $(".card1-text3").text(`UV Index: ${uvIndex}`);
        //card 2 (TWO DAYS AFTER)
        var temp = data.daily[2].temp.day;
        var humidity = data.daily[2].humidity
        var wind = data.daily[2].wind_speed
        var uvIndex = data.daily[2].uvi
        $(".card2-text0").text(`Temperature: ${temp} °F`);
        $(".card2-text1").text(`Humidity: ${humidity} %`);
        $(".card2-text2").text(`Wind: ${wind} MPH`);
        $(".card2-text3").text(`UV Index: ${uvIndex}`);
        //card 3 (THREE DAYS AFTER)
        var temp = data.daily[3].temp.day;
        var humidity = data.daily[3].humidity
        var wind = data.daily[3].wind_speed
        var uvIndex = data.daily[3].uvi
        $(".card3-text0").text(`Temperature: ${temp} °F`);
        $(".card3-text1").text(`Humidity: ${humidity} %`);
        $(".card3-text2").text(`Wind: ${wind} MPH`);
        $(".card3-text3").text(`UV Index: ${uvIndex}`);
        //card 4 (FOUR DAYS AFTER)
        var temp = data.daily[4].temp.day;
        var humidity = data.daily[4].humidity
        var wind = data.daily[4].wind_speed
        var uvIndex = data.daily[4].uvi
        $(".card4-text0").text(`Temperature: ${temp} °F`);
        $(".card4-text1").text(`Humidity: ${humidity} %`);
        $(".card4-text2").text(`Wind: ${wind} MPH`);
        $(".card4-text3").text(`UV Index: ${uvIndex}`);
         //card 5 (FIVE DAYS AFTER)
         var temp = data.daily[5].temp.day;
        var humidity = data.daily[5].humidity
        var wind = data.daily[5].wind_speed
        var uvIndex = data.daily[5].uvi
        $(".card5-text0").text(`Temperature: ${temp} °F`);
        $(".card5-text1").text(`Humidity: ${humidity} %`);
        $(".card5-text2").text(`Wind: ${wind} MPH`);
        $(".card5-text3").text(`UV Index: ${uvIndex}`);
        
        
    })
   
 } 

















// // weather-functions.js

// getWeatherDataByCity = function (city) {
//     return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (responseData) {

//             var weatherDataObject = {
//                 temprature: responseData.list[0].main.temp,
//                 humidity: responseData.list[1].main.humidity,
//                 windSpeed: responseData.list[0].wind.speed,
//                 coordinates: responseData.city.coord
//             }
//             console.log(weatherDataObject)
//             return weatherDataObject;
//         })
// }

// getWeatherDataByCity("Irvine").then(function () {
//     console.log(weatherDataObject)
// })



// fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
//     .then(function (data) {
//         return data.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })