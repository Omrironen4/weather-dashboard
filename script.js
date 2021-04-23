

$("button").on("click",function(){
    var searchCity = $("#search").val();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        console.log(data)
        console.log(data.city.sunrise)
    })
})
