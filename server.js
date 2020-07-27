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



// localhost:3000/weather

app.get('/weather', (request,response) =>{
    // var weather =request.query.forecast;
    var data2 =require('./data/weather.json');
    data2.data.forEach(element =>{
        var newWather = new Weather(element)

    });


    response.status(200).send(arr);

});

let arr=[];
function Weather(data2){
    this.forcast=data2.weather.description;
    this.time=data2.valid_date;
    arr.push(this);
    }
    
    





app.all('*', (request, response) => {
    request.status(500).send('"Sorry, something went wrong"');
});

