'use strict';

//install cors, dotenv, express
//same as import express like react app
require('dotenv').config();
// require('data/weather.json');
const express = require('express');
const app = express();
const cors = require('cors');
const weather = require('./data/weather.json');
const PORT = process.env.PORT;

app.use(cors());


// set up a route
// establish /weather as endpoint
// use a method on app
// get takes two things to run: route and callback handler function
// works like event listener
app.get('/weather', handleGetWeather);

// req is the request that express handles
// query is the query object 
// query is the location in this place
// city, lat, lon are location objects
function handleGetWeather(req, res) {
  const cityName = req.query.city_name;
  const lon = req.query.lon;
  const lat = req.query.lat;
  console.log(req.query);
  try {
    const cityResponse = weather.find(location => {
      if ( (lon === location.lon && lat === location.lat) || cityName === location.city_name) {
        return true;
      }
      return false;
    });

    if (cityResponse) {
      const forecastArray = cityResponse.data.map(location => new Forecast(location));
      console.log(forecastArray);
      res.status(200).send(forecastArray);
    } else {
      res.statues(404).send('city not found');
    }
  } catch (err) {
    res.status(500).send('servor error');
  }
}


class Forecast {
  constructor(obj) {
    this.date = obj.valid_date;
    // this.min_temp = obj.min_temp;
    // this.max_temp = obj.max_temp;
    this.description = obj.weather.description;

  }
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));