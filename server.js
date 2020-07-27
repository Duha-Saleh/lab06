'use strict';


const express =require('express');
const cors =require('cors');
require('dotenv').config();
const app=express();

const PORT =process.env.PORT || 3000


app.listen(PORT,()=> {
    console.log('I am listning to port', PORT);
});

// localhost:3000/location/?city=amman
app.get('/location', (request,response) =>{
    var location=request.query.city;
    var data =require('./data/location.json');

    var newLocation = new Location(location, data)

    response.status(200).send(newLocation);

});
 
 
function Location(city,data){
this.search_query=city;
this.formatted_query=data[0].display_name;
this.latitude=data[0].lat;
this.longitude=data[0].lon;
}



// localhost:3000/weather/?weather=time

app.get('/weather', (request,response) =>{
    var weather =request.query.forecast;
    var data2 =require('./data/weather.json');

    var newWather = new Weather(forecast, data2)

    response.status(200).send(newWather);

});


function Weather(forecast,data2){
    this.forcast=forecast;
    this.time=data2.datetime;
    }
    





app.get('*', (request, response) => {
    request.status(404).send('"Sorry, something went wrong"');
});

app.use((error, request, response) => {
    response.status(500).send(error);
});
