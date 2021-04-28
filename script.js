// init function runs, which calls the saveSearch function
init();
var weatherContainer = $(".card-body"); // used to hide the card containers, mainly for the looks of the page before the search
weatherContainer.hide(); //hiding the card containers
today = moment().format("MMM Do YY"); // shows the current date
var presentDate = today 
//adding days to current day .. 
var plusOneDay = moment().add(1, "days").format("MMM Do YY"); 
var plusTwoDays = moment().add(2, "days").format("MMM Do YY")
var plusThreeDays = moment().add(3, "days").format("MMM Do YY")
var plusFourDays = moment().add(4, "days").format("MMM Do YY")
var plusFiveDays = moment().add(5, "days").format("MMM Do YY")


var searchArray = [] // array that stores searched cities
$("button").on("click", function (event) {
    weatherContainer.show(); // showing the card containers
    event.preventDefault(); // preventing a refresh on button click
    var searchCity = $("#search").val(); // input value from search
    getWeatherByCity(searchCity); // calling function with input value
    
    if(!searchArray.includes(searchCity)){ // if the search input is not inside the search array (previous searches), then we will add value to array on click. This eliminates duplicates
        searchArray.push(searchCity);
        console.log(searchArray)
    } 
    
// setting the local storage with search array on click 
    localStorage.setItem("searchMarker", JSON.stringify(searchArray));
    console.log(localStorage);
    saveSearch(); // running the saveSearch function on click 
})

// this function saves our searches in the search array 
function saveSearch() {
   var savedCities = JSON.parse(localStorage.getItem("searchMarker"))|| []
   searchArray = savedCities; // making the array equal the saved cities (our local storage array)
   console.log(searchArray);
   $(".search-history").empty(); //here we empty the div after click, this prevents having multiple of the same cities in the history 

   // makes an li for every search array, and appends to the search history 
   for(var i=0; i<searchArray.length; i++){

    var li = $("<li>").text(searchArray[i]);
    $(".search-history").append(li);

   }
   if (savedCities !== null) {
    searchArray = savedCities;
  } else {
    searchHistory = [];
  }
}

//FIRST API CALL TO GET CITY COORDINATES
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
        
        // card titles & date for 5 day forcast
        $(".card0-title").text(`City: ${cityName} (${presentDate})`);
        $(".card1-title").text(`City: ${cityName} (${plusOneDay})`);
        $(".card2-title").text(`City: ${cityName} (${plusTwoDays})`);
        $(".card3-title").text(`City: ${cityName} (${plusThreeDays})`);
        $(".card4-title").text(`City: ${cityName} (${plusFourDays})`);
        $(".card5-title").text(`City: ${cityName} (${plusFiveDays})`);
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        oneCall(lat,lon); // using lat and lon data for next api call
    })
 }
 
//SECOND API CALL TO GET UV INDEX USING COORDINATES 
 function oneCall(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
    .then(function (res){
        return res.json();
    }).then (function (data){
        console.log(data)

        //CARD 0 (CURRENT DAY)
        var temp = data.daily[0].temp.day;
        var humidity = data.daily[0].humidity
        var wind = data.daily[0].wind_speed
        var uvIndex0 = data.current.uvi
        var icon0 = data.daily[0].weather[0].icon
        $(".card0-text0").text(`Temperature: ${temp} °F`);
        $(".card0-text1").text(`Humidity: ${humidity} %`);
        $(".card0-text2").text(`Wind: ${wind} MPH`);
        $(".card0-text3").text(`UV Index: ${uvIndex0}`);
        $(".icon").attr("src",`http://openweathermap.org/img/wn/${icon0}.png`);
        
        if (uvIndex0 <= 3) {
            $(".card0-text3").removeClass("moderate severe").addClass("light");
        } else if (uvIndex0 > 3 && uvIndex0<= 7) {
            $(".card0-text3").removeClass("light severe").addClass("moderate");        } else {
                $(".card0-text3").removeClass("moderate light").addClass("severe");
        }


        //card 1 (ONE DAY AFTER)
        var temp = data.daily[1].temp.day;
        var humidity = data.daily[1].humidity
        var wind = data.daily[1].wind_speed
        var uvIndex1 = data.daily[1].uvi
        var icon1 = data.daily[1].weather[0].icon
        $(".card1-text0").text(`Temperature: ${temp} °F`);
        $(".card1-text1").text(`Humidity: ${humidity} %`);
        $(".card1-text2").text(`Wind: ${wind} MPH`);
        $(".card1-text3").text(`UV Index: ${uvIndex1}`);
        $(".icon1").attr("src",`http://openweathermap.org/img/wn/${icon1}.png`)

        if (uvIndex1 <= 3) {
            $(".card1-text3").removeClass("moderate severe").addClass("light");
        } else if (uvIndex1 > 3 && uvIndex1<= 7) {
            $(".card1-text3").removeClass("light severe").addClass("moderate");        } else {
                $(".card1-text3").removeClass("moderate light").addClass("severe");
        }
        //card 2 (TWO DAYS AFTER)
        var temp = data.daily[2].temp.day;
        var humidity = data.daily[2].humidity
        var wind = data.daily[2].wind_speed
        var uvIndex2 = data.daily[2].uvi
        var icon2 = data.daily[1].weather[0].icon
        $(".card2-text0").text(`Temperature: ${temp} °F`);
        $(".card2-text1").text(`Humidity: ${humidity} %`);
        $(".card2-text2").text(`Wind: ${wind} MPH`);
        $(".card2-text3").text(`UV Index: ${uvIndex2}`);
        $(".icon2").attr("src",`http://openweathermap.org/img/wn/${icon2}.png`)

        if (uvIndex2 <= 3) {
            $(".card2-text3").removeClass("moderate severe").addClass("light");
        } else if (uvIndex2 > 3 && uvIndex2<= 7) {
            $(".card2-text3").removeClass("light severe").addClass("moderate");        } else {
                $(".card2-text3").removeClass("moderate light").addClass("severe");
        }
        //card 3 (THREE DAYS AFTER)
        var temp = data.daily[3].temp.day;
        var humidity = data.daily[3].humidity
        var wind = data.daily[3].wind_speed
        var uvIndex3 = data.daily[3].uvi
        var icon3 = data.daily[2].weather[0].icon
        $(".card3-text0").text(`Temperature: ${temp} °F`);
        $(".card3-text1").text(`Humidity: ${humidity} %`);
        $(".card3-text2").text(`Wind: ${wind} MPH`);
        $(".card3-text3").text(`UV Index: ${uvIndex3}`);
        $(".icon3").attr("src",`http://openweathermap.org/img/wn/${icon3}.png`)

        if (uvIndex3 <= 3) {
            $(".card3-text3").removeClass("moderate severe").addClass("light");
        } else if (uvIndex3 > 3 && uvIndex3<= 7) {
            $(".card3-text3").removeClass("light severe").addClass("moderate");        } else {
                $(".card3-text3").removeClass("moderate light").addClass("severe");
        }
        //card 4 (FOUR DAYS AFTER)
        var temp = data.daily[4].temp.day;
        var humidity = data.daily[4].humidity
        var wind = data.daily[4].wind_speed
        var uvIndex4 = data.daily[4].uvi
        var icon4 = data.daily[3].weather[0].icon
        $(".card4-text0").text(`Temperature: ${temp} °F`);
        $(".card4-text1").text(`Humidity: ${humidity} %`);
        $(".card4-text2").text(`Wind: ${wind} MPH`);
        $(".card4-text3").text(`UV Index: ${uvIndex4}`);
        $(".icon4").attr("src",`http://openweathermap.org/img/wn/${icon4}.png`)

        if (uvIndex4 <= 3) {
            $(".card4-text3").removeClass("moderate severe").addClass("light");
        } else if (uvIndex4 > 3 && uvIndex4<= 7) {
            $(".card4-text3").removeClass("light severe").addClass("moderate");        } else {
                $(".card4-text3").removeClass("moderate light").addClass("severe");
        }
         //card 5 (FIVE DAYS AFTER)
         var temp = data.daily[5].temp.day;
        var humidity = data.daily[5].humidity
        var wind = data.daily[5].wind_speed
        var uvIndex5 = data.daily[5].uvi
        var icon5 = data.daily[4].weather[0].icon
        $(".card5-text0").text(`Temperature: ${temp} °F`);
        $(".card5-text1").text(`Humidity: ${humidity} %`);
        $(".card5-text2").text(`Wind: ${wind} MPH`);
        $(".card5-text3").text(`UV Index: ${uvIndex5}`);
        $(".icon5").attr("src",`http://openweathermap.org/img/wn/${icon5}.png`)

        if (uvIndex5 <= 3) {
            $(".card5-text3").removeClass("moderate severe").addClass("light");
        } else if (uvIndex5 > 3 && uvIndex5<= 7) {
            $(".card5-text3").removeClass("light severe").addClass("moderate");        } else {
                $(".card5-text3").removeClass("moderate light").addClass("severe");
        }
    })
}
function init() {
    saveSearch();
}


