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

$("button").on("click", function () {
    var searchCity = $("#search").val();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            console.log(data)
            console.log('temp', data.list[0].main.temp);
            console.log('humidity', data.list[1].main.humidity);
            console.log('speed', data.list[0].wind.speed);
            console.log('coords', data.city.coord);
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;
        })
})


