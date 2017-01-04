(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "90c92f919311ddca0cb00444f05420d3";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/weather.js":2}]},{},[3]);
