import { config } from 'dotenv';
config();
import request from 'request';

// Include the express module and instantiate an instance of the app
import express, { static } from 'express';
const app = express();

// Set up middle-ware
import { urlencoded, json as _json } from 'body-parser';
app.use(urlencoded({ extended: false }));
app.use(_json());

import cors from 'cors';
app.use(cors());

app.use(static('dist'));

const newLocal = 8082;
// Set listening port and launch server
const port = newLocal;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

// Sample GET route
app.post('/add', (req) => {
  let newCity = req.body.city;
  let newDate = req.body.date;
  let cityString = newCity.replace(' ', '%20');
  console.log(cityString, newDate);
  geoNames(cityString, newDate);
  // res.send('Received');
});

// GeoNames API call
function geoNames(name, dateText) {
  request(`http://api.geonames.org/search?q=${name}&maxRows=1&username=culberde`, {json: true}, (err, _res, body) => {
    if (err) {
      return console.log(err);
    }
    let lat = body.geonames[0].lat;
    let lon = body.geonames[0].lng;
    console.log([lat, lon]);
    darkSky(lat, lon, dateText);
  });
}

// DarkSky API call
function darkSky(lat, lon, dateText) {
  let dateInfo = dateProximity(dateText);
  let type = dateInfo[0];
  let date = dateInfo[1];
  console.log(`${type}: ${date}`);
  if (type == 'current') {
    request(`https://api.darksky.net/forecast/${process.env.DARKSKY_APIKEY}/${lat},${lon}`, {json: true}, (err, _res, body) => {
      if (err) { return console.log(err); }
      return createWeeklyFcst(body.daily.data);
    })
  }
  else {
    request(`https://api.darksky.net/forecast/${process.env.DARKSKY_APIKEY}/${lat},${lon},${date}`, {json: true}, (err, _res, body) => {
      if (err) { return console.log(err); }
      console.log(body.daily.data.summary);
      let expectedFcst = {
        summary: body.daily.data[0].summary,
        icon: body.daily.data[0].icon,
        sunrise: unixToTime(body.daily.data[0].sunriseTime),
        sunset: unixToTime(body.daily.data[0].sunsetTime),
        high: `${body.daily.data[0].temperatureHigh.toFixed().toString()} F`,
        low: `${body.daily.data[0].temperatureLow.toFixed().toString()} F`
      }
      return expectedFcst;
    })
  }
};

// determines if departure date is within 7 days, if it is it passes 'current'
// otherwise, 'expected'. This will be used for the DarkSky API call.
function dateProximity(text) {
  const currentDate = new Date();
  const travelDate = new Date(text);
  const unixDate = travelDate.valueOf() / 1000;
  console.log(unixDate);
  if (travelDate - currentDate > 7 * 24 * 60 * 60 * 1000) {
    return ['expected', unixDate];
  }
  else {
    return ['current', unixDate];
  };
};

function createWeeklyFcst(data) {
  let fcst = {};
  let i = 0;
  for (day in data) {
    let newDay = {
      date: unixToDay(data[i].time),
      icon: data[i].icon,
      high: `${data[i].temperatureHigh.toFixed().toString()} F`,
      low: `${data[i].temperatureLow.toFixed().toString()} F`
    }
    fcst[newDay.date] = newDay;
    i += 1;
  }
  return fcst;
}

function unixToDay(unix) {
  let date = new Date(unix * 1000);
  return [
    date.toDateString().substring(0, 3),
    `${date.getMonth() + 1}/${date.getDate()}`
  ]
}

function unixToTime(unix) {
  let date = new Date(unix * 1000);
  let period = 'AM';
  let hours = date.getHours();
  if (hours > 12) {
    period = 'PM';
    hours -= 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes.toString()}`;
  }
  return `${hours}:${minutes.toFixed()} ${period}`;
}
