const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  console.log(req.body.cityName)
  const apiKey =" 071ae9990f00873fef062f6bf6095f41";
  const query = req.body.cityName
  const units = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;



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
      const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> The weather is currently " + weatherDescription + " <p>")
      res.write("<h1>The temperture in "+ query +"  is " + temp + " degrees Fahrenheit</h1>")
      res.write("<img src=" + imageURL + ">");
      res.send()
    })
  })
})
  //res.send("Server is up and running.")




app.listen(3000, function() {
  console.log("Server is running on port 3000.")
});
