'use strict';


const express =require('express');
const cors =require('cors');
require('dotenv').config();
const app=express();

const PORT =process.env.PORT || 3000
const superagent = require('superagent');


app.listen(PORT,()=> {
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

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data[0].display_name;
    this.latitude = data[0].lat;
    this.longitude = data[0].lon;
}



app.get('/weather', (request,response) =>{
    var weather =request.query.forecast;
    // var data2 =require('./data/weather.json');
    let weatherKey=process.env.WEATHER_API_KEY;
    let url='';

    });

    superagent.get(url)
        .then(data => {
            data2.data.forEach(element =>{
        
        var newWather = new Weather(element);
        
});

    response.status(200).send(arr);

});

let arr=[];
function Weather(data2){
    this.forcast=data2.weather.description;
    this.time=data2.valid_date;
    arr.push(this);
    }



    app.get('/trial', (request,response) =>{
        var trial =request.query.trial;
        // var data2 =require('./data/weather.json');
        let trialKey=process.env.WEATHER_API_KEY;
        let url='';
    
        });
    
        superagent.get(url)
            .then(data => {
                data2.data.forEach(element =>{
            
            var newTrial = new Trial(element);
            
    });
    
        response.status(200).send(arr);
    
    });
    
    let arr=[];
    function Weather(data2){
        this.forcast=data2.weather.description;
        this.time=data2.valid_date;
        arr.push(this);
        }
    
    

        
        let arr2=[];

    function Trail(dataOfTrails) {
        this.name= dataOfTrails.name;
        this.location = dataOfTrails.location;
        this.length =dataOfTrails.length;
        this.stars = dataOfTrails.stars;
        this.star_votes = dataOfTrails.starVotes;
        this.summary = dataOfTrails.summary;
        this.trail_url = dataOfTrails.url;
        this.conditions = dataOfTrails.conditionStatus;
        arr2.push(this);

    }


    app.get('*', (req, res) => {
        res.status(404).send('Page Not Found');
    });
    
    app.use((error, req, res) => {
        res.status(500).send('error');
    });
    