'use strict';

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

app.get ('/location', locationFunction);
function locationFunction (request, response) {
  const geoData = require('./data/geo.json');
  const city = request.query.city;
  const locationData = new Location (city, geoData);
  
console.log (city); 
response.status(200).send (locationData);
}


function Location (city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

app.use('*', (request, response) => response.send('Sorry, that route does not exist.'));

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));