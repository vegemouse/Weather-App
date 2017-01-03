var Weather = require('./../js/weather.js').weatherModule;
var Conversion = require('./../js/weather.js').conversionModule;

var displayForecast = function(city, forecastArray, unit) {
  $('#forecastOutput').empty();
  for (var i = 0; i < forecastArray.length; i++) {
    $('#forecastOutput').append(
      "<div class='day'>" +
        moment().add(i, 'days').format("MM/DD ddd") + ": " + convertTemp(forecastArray[i].main.temp, unit) +
        ((unit === "celsius") ? "°C" : "°F") +
      "</div>"
    );
  }
};

var convertTemp = function(elem, unit) {
  var currentConversion = new Conversion();
  return (unit === "celsius") ?
    (Math.floor(currentConversion.kelToCel(elem))) :
    (Math.floor(currentConversion.kelToFahr(elem)));
};

$(document).ready(function() {
  var currentWeatherObject = new Weather();

  $("#forecast").click(function() {
    var city = $("#city").val();
    var radioValue = $("input[name='temp-measurement']:checked").val();
    (radioValue == "celsius") ?
      currentWeatherObject.getForecast(city, displayForecast, "celsius") :
      currentWeatherObject.getForecast(city, displayForecast, "fahrenheit");
  });
});
