$(function () {
  var location = $("#location");
  var degree = $("#degree");
  var desc = $("#desc");
  var icon = $("#icon");
  var lat;
  var lon; 
  var celsius;
  var fahr;
  var fahrDisplay = false;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = "lat=" + position.coords.latitude;
      lon = "lon=" + position.coords.longitude;
      getWeather(location, degree, desc, icon, lat, lon);
      $("#celsius").click(function(event) {
        celsius = document.getElementsByTagName("H3")[1].textContent;
        if (!fahrDisplay) {
          fahr = celsius * 9 / 5 + 32;
          degree.html(fahr);
          $("#celsius").html("&#8457");
          fahrDisplay = true;
        } else {
          celsius = (fahr - 32) * 5 / 9;
          degree.html(celsius);
          $("#celsius").html("&#8451");
          fahrDisplay = false;
        }
        
      })
    });
  }  
});

function getWeather(location, degree, desc, icon, lat, lon) {
  var url = "https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon;
  $.getJSON(url, function(data) {
    location.html(data.name + ", " + data.sys.country);
    degree.html(data.main.temp);
    desc.html(data.weather[0].description);
    icon.attr("src", data.weather[0].icon);
  });
}