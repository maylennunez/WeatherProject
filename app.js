const express = require("express");
const https = require("https");
const app = express();



app.get("/", function(req, res) {


  const url = "https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=071ae9990f00873fef062f6bf6095f41&units=imperial"

  https.get(url, function(response) {
    console.log(response.statusCode); //
  //  console.log(url)
    response.on("data", function(data) {
    /*  const object = {
       name: 'Miami',
       main: 'Clouds',
       description: 'scattered clouds',
       icon: '03d'
      }
      console.log(JSON.stringify(object));*/
      const weatherData = JSON.parse(data)
      console.log(weatherData)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> The weather is currently " + weatherDescription + " <p>")
      res.write("<h1>The temperture in Miami is " + temp + " degrees Fahrenheit</h1>")
      res.write("<img src=" + imageUrl + ">");
      res.send()
    })
  })

  //res.send("Server is up and running.")
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.")
});
