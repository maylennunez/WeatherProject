const express = require("express");
const https = require("https");
const app = express();



app.get("/", function(req, res){
  res.send("Server is up and running.")
});
const url = "https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=071ae9990f00873fef062f6bf6095f41"

https.get(url, function(response){
  console.log(url);
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.")
});
