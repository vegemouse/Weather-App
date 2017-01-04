var apiKey = require("./../.env").apiKey;

function Weather(){
}

Weather.prototype.getForecast = function(city, displayFunction, unit) {
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response) {
    console.log(response);
    var forecastArray = [];
    for (var i = 0; i < 5; i++) {
      forecastArray.push(response.list[i]);
    }
    displayFunction(city, forecastArray, unit);
  }).fail(function(error) {
    $('#showText').text(error.responseJSON.message);
  });
};

function Conversion() {
}

Conversion.prototype.kelToFahr = function(kelvin) {
  return ( 9 / 5 ) * (kelvin - 273) + 32;
}

Conversion.prototype.kelToCel = function(kelvin) {
  return (kelvin - 273);
}

exports.weatherModule = Weather;
exports.conversionModule = Conversion;
