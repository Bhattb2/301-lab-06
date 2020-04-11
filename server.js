'use strict';

//  server build
require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/hello', (request, response) => {
  response.status(200).send('Hello');
});

app.get('/data', dataFunction);
function dataFunction (request, response) {
  let airplanes = {
    departure: Date.now(),
    canFly: true,
    pilot: 'Well Trained',
  };
  response.status(200).json(airplanes);
};

// 
app.get ('/location', locationFunction);
function locationFunction (request, response) {
  const geoData = require('./data/geo.json');
  const city = request.query.city;
  const locationData = new Location (city, geoData);
  
console.log (city); 
response.status(200).send (locationData);
}


//getting the weather forecast for location
//  path to weather
app.get('/weather', weatherFunction);
function weatherFunction (request, response) {
  // get data from darksky.json
  const weatherData = require('./data.darksky.json');
  const weather = request.query.weather;
  const weatherBuilder = new WeatherConstructor(daily, weatherData);
  weatherData.daily.data.forEach(obj =>{
    waetherArray.push(new WeatherConstructor (obj.time, obj.summary));
  })
  response.send(waetherArray);
  console.log(waetherArray);
}

// constructor function to get information from geo.json file
function Location (city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}


app.use('*', (request, response) => response.send('Sorry, that route does not exist.'));

//  activate the PORT
app.listen(PORT,() => console.log(`Listening on port ${PORT}`));