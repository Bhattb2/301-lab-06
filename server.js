'use strict';

//   require libraries server build
require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

// paths
//  path to location
let weatherArray = [];

app.get('/location', locationFunction);
function locationFunction (request, response) {
  try{
  const geoData = require('./data/geo.json');
  const city = request.query.city;
  const locationData = new Location(city, geoData);
  
console.log (city); 
response.status(200).json(locationData);
} catch{
  errorHandler('so sorry, something went wrong.', request, response);
}
}

//getting the weather forecast for location
app.get('/weather', (request, response) => {
  try {
    const weatherData = require('./data/darksky.json');
    // const weatherBuilder = new WeatherConstructor(daily, weatherData);
    weatherData.daily.data.forEach(obj =>{
      weatherArray.push(new WeatherConstructor (obj.time, obj.summary));
    })
    response.send(weatherArray);
    console.log(weatherArray);
  }
  catch(error){
    errorHandler('so sorry, something went wrong.', request, response);
  }
})


// weather constructor
function WeatherConstructor(time, forecast){
this.time = new Date(time*1000).toString;
this.forecast = forecast;
}

// constructor function to get information from geo.json file
function Location (city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

//  constructor error handler
const errorHandler = (error, request, response) => {
  response.status(500).send(error);
}


//  activate the PORT
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
