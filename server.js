'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000
const superagent = require('superagent');


app.listen(PORT, () => {
    console.log('I am listning to port', PORT);
});

// localhost:3000/location/?city=amman
// app.get('/location', (request,response) =>{
//     var location=request.query.city;
//     var data =require('./data/location.json');

//     var newLocation = new Location(location, data)

//     response.status(200).send(newLocation);

// });


// function Location(city,data){
// this.search_query=city;
// this.formatted_query=data[0].display_name;
// this.latitude=data[0].lat;
// this.longitude=data[0].lon;
// }


// localhost:3000/weather

// app.get('/weather', (request,response) =>{
//     // var weather =request.query.forecast;
//     var data2 =require('./data/weather.json');
//     data2.data.forEach(element =>{
//         var newWather = new Weather(element)

//     });


//     response.status(200).send(arr);

// });

// let arr=[];
// function Weather(data2){
//     this.forcast=data2.weather.description;
//     this.time=data2.valid_date;
//     arr.push(this);
//     }





// app.all('*', (request, response) => {
//     response.status(500).send('"Sorry, something went wrong"');
// });


//lab7
app.get('/location', (req, res) => {
    let city = req.query.city;
    let locationKey = process.env.GEOCODE_API_KEY;
    let url = `https://eu1.locationiq.com/v1/search.php?key=${locationKey}&q=${city}&format=json`;
    superagent.get(url)
        .then(geoData => {
            let newLocation = new Location(city, geoData.body);
            res.status(200).send(newLocation);
        });

});
var latitudee= [];
var longitudee= [] ;
function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data[0].display_name;
    this.latitude = data[0].lat;
    this.longitude = data[0].lon;
    latitudee.push(this.latitude);
    longitudee.push(this.longitude);
}

//localhost:3000/weather
app.get('/weather', (request, response) => {
    var weather = request.query.forecast;
    
    let weatherKey = process.env.WEATHER_API_KEY;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitudee}&lon=${longitudee}&key=${weatherKey}`;

    superagent.get(url)
        .then(data2 => {
            var dataOfweather=JSON.parse(data2.text).data;

            dataOfweather.forEach(element => {

                var newWather = new Weather(element);

            });

            response.status(200).json(arr);

        });


});

let arr = [];
function Weather(data2) {
    this.forcast = data2.weather.description;
    this.time = data2.valid_date;
    arr.push(this);
}




//localhost:3000/trial
app.get('/trails', (request, response) => {
    // var trial = request.query.trial;
    let trialKey = process.env.TRIAL_API_KEY;
    let url = `https://www.hikingproject.com/data/get-trails?lat=${latitudee}&lon=${longitudee}&maxDistance=100&key=${trialKey}`;


    superagent.get(url).then(data3 =>  {
        var dataOfTrial=JSON.parse(data3.text).trails;
       
        dataOfTrial.forEach(element => {
    
                var newTrial = new Trails(element);
    
            });
    
            response.status(200).json(arr2);
    
        });
    


});





let arr2 = [];
function Trails(data3) {
    this.name = data3.name;
    this.location = data3.location;
    this.length = data3.length;
    this.stars = data3.stars;
    this.star_votes = data3.starVotes;
    this.summary = data3.summary;
    this.trail_url = data3.url;
    this.conditions = data3.conditionStatus;
this.condition_time=data3.conditionDate;

    arr2.push(this);

}


app.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
});

app.use((error, req, res) => {
    res.status(500).send('error');
});
