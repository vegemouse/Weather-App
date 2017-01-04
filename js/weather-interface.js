var Weather = require('./../js/weather.js').weatherModule;
var Conversion = require('./../js/weather.js').conversionModule;

var displayForecast = function(city, forecastArray, unit) {
  $('#forecastOutput').empty();
  for (var i = 0; i < forecastArray.length; i++) {
    $('#forecastOutput').append(
      "<div class='day'>" +
        "<div class='date'>" + moment().add(i, 'days').format("ddd MM/DD") + "</div>" +
        "<div class='temp'>" + convertTemp(forecastArray[i].main.temp, unit)  + "</div>"  +
        "<div class='minMax'>" + convertTemp(forecastArray[i].main.temp_min, unit) + " / " + convertTemp(forecastArray[i].main.temp_max, unit) + "</div>" + "<div class='humidity'> Humidity: " + forecastArray[i].main.humidity + "%</div>"  +
      "</div>"
    );
  }
  getBG(forecastArray[0].weather[0].icon);
};

var getBG = function(icon) {
  if        (icon === "01d" || icon === "01n" ||
             icon === "02d" || icon === "02n") {
               $('#forecastOutput').css("background-image", "url('../../img/sun.jpg')");
  } else if (icon === "03d" || icon === "03n" ||
             icon === "04d" || icon === "04n") {
               $('#forecastOutput').css("background-image", "url('../../img/cloud.jpg')");
  } else if (icon === "09d" || icon === "09n" ||
             icon === "10d" || icon === "10n" ||
             icon === "11d" || icon === "11n") {
               $('#forecastOutput').css("background-image", "url('../../img/rain.jpg')");
  } else if (icon === "13d" || icon === "13n") {
               $('#forecastOutput').css("background-image", "url('../../img/snow.jpg')");
  } else if (icon === "50d" || icon === "50n") {
    $('#forecastOutput').css("background-image", "url('../../img/mist.jpg')");
  }
};

var convertTemp = function(elem, unit) {
  var currentConversion = new Conversion();
  return (unit === "celsius") ?
    ((Math.floor(currentConversion.kelToCel(elem))) + "°C") :
    ((Math.floor(currentConversion.kelToFahr(elem))) + "°F");
};

$(document).ready(function() {
  var currentWeatherObject = new Weather();
  setInterval(function() {
    $("#time").text(moment().format("h:mm:ss A"));
  }, 1000);
  $("#forecast").submit(function(event) {
    event.preventDefault();
    var city = $("#city").val();
    var radioValue = $("input[name='temp-measurement']:checked").val();
    $(".input").hide();
    (radioValue == "celsius") ?
      currentWeatherObject.getForecast(city, displayForecast, "celsius") :
      currentWeatherObject.getForecast(city, displayForecast, "fahrenheit");
    $(".output").css("width", "auto");
    setTimeout(function() {
      $(".output").css("opacity", "1");
    }, 250);
  });
  $("#refresh").click(function() {
    location.reload();
  });
});
