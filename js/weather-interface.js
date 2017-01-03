var apiKey = require("./../.env").apiKey;

$(document).ready(function() {
  $('#humidity').click(function() {
    var city = $('#city').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      $('#showText').text("The humidity in " + city + " is " + response.main.humidity + "%");
      console.log(response);
    }).fail(function(error) {
      $('showWeather').text(error.responseJSON.message);
    });
  });
});
