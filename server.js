'use strict';

//lab06

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//     console.log('I am listning to port', PORT);
// });

// // localhost:3000/location/?city=amman
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


// // localhost:3000/weather

// app.get('/weather', (request,response) =>{
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

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3000
// //added for lab7 with installing it 
// const superagent = require('superagent');





// // //localhost:3000/location/?city=amman
// app.get('/location', (req, res) => {
//     //بدنا ناخدها من اللي بعبيها بال موقع 
//     let city = req.query.city;
//     //////added for lab7

//     //from locationiq >> 1. your token  اول صفحة >>GEOCODE_API_KEY 2.API documentation here اول صفحة>> search forward GeoCoding باخد اي رابط تاع أمريكا او اوروبا وبعدل عليه  
//     let locationKey = process.env.GEOCODE_API_KEY;
//     let url = `https://eu1.locationiq.com/v1/search.php?key=${locationKey}&q=${city}&format=json`;

//     //to get the data from the url
//     superagent.get(url)
//         .then(data => {
//             let newLocation = new Location(city, data.body);
//             res.status(200).send(newLocation);
//         });

// });

// // // Trello  ,,they want this when put localhost:3000/location/?city=amman
// // //مدخلات الكونستركتر ما قبل المساواة
// // // "search_query": "seattle",
// // // "formatted_query": "Seattle, WA, USA",
// // // "latitude": "47.606210",
// // // "longitude": "-122.332071"

// // // ما بعد المساواة
// // //بروح على ال موقع location iq
// // // وبشوف الشكل كمان من Search forward Geocoding >> response
// // // https://locationiq.com/docs#forward-geocoding عاليمين

// // // لابعتهم للطقس والتريال
// var latitudee = [];
// var longitudee = [];

// function Location(city, data) {
//     this.search_query = city;
//     this.formatted_query = data[0].display_name;
//     this.latitude = data[0].lat;
//     this.longitude = data[0].lon;

//     latitudee.push(this.latitude);
//     longitudee.push(this.longitude);
// }
// // // /////////to here





// //     /// من موقع www.weatherbit.io
// //     // من API keya adress

// http://localhost:3000/weather?lon=333&lat=4343
// app.get('/weather', (request, response) => {
//     let latitudee = request.query.lat;
//     let longitudee = request.query.lon;
    
//         let weatherKey = process.env.WEATHER_API_KEY;
//         let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitudee}&lon=${longitudee}&key=${weatherKey}`;
    
//         superagent.get(url)
//             .then(data2 => {
//                 const weaherInfo=[];
//                 data2.body.data.map(element => {
//                     let newWather = new Weather(element);
//                     weaherInfo.push(newWather);

//                 });
//                 response.send(weaherInfo);

//             });
//         });


// let arr = [];
// function Weather(data2) {
//     //object inside object ,, then the poroperty
//     this.forcast = data2.weather.description;
//     //objecect inside it the property
//     this.time = data2.valid_date;
//     arr.push(this);
// }




// //localhost:3000/trial
// app.get('/trails', (request, response) => {
//     // var trial = request.query.trial;
//     let trialKey = process.env.TRIAL_API_KEY;
//     let url = `https://www.hikingproject.com/data/get-trails?lat=${latitudee}&lon=${longitudee}&maxDistance=100&key=${trialKey}`;


//     superagent.get(url).then(data3 => {
//         var dataOfTrial = JSON.parse(data3.text).trails;

//         dataOfTrial.forEach(element => {

//             var newTrial = new Trails(element);

//         });

//         response.status(200).json(arr2);

//     });



// });





// let arr2 = [];
// function Trails(data3) {
//     this.name = data3.name;
//     this.location = data3.location;
//     this.length = data3.length;
//     this.stars = data3.stars;
//     this.star_votes = data3.starVotes;
//     this.summary = data3.summary;
//     this.trail_url = data3.url;
//     this.conditions = data3.conditionStatus;
//     this.condition_time = data3.conditionDate;

//     arr2.push(this);

// }




// app.get('*', (req, res) => {
//     res.status(404).send('Page Not Found');
// });

// app.use((error, req, res) => {
//     res.status(500).send('error');
// });


// app.listen(PORT, () => {
//     console.log('I am listning to port', PORT);
// });


//lab8

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000
const pg =require('pg');
const superagent= require('superagent');
const client = new pg.Client(process.env.DATABASE_URL);

app.get('/location', (req, res) => {
    let city = req.query.city;
    let locationKey = process.env.GEOCODE_API_KEY;
    let url = `https://eu1.locationiq.com/v1/search.php?key=${locationKey}&q=${city}&format=json`;

    let selectSQL =`SELECT * FROM locations WHERE search_query=${city}`

    client.query(selectSQL).then(result=>{
if(result.rowCount){
    res.send(result);
}
else{
    superagent.get(url)
    .then(data => {
        let newLocation = new Location(city, data.body);
        let queryValues=[newLocation.search_query,newLocation.formatted_query,newLocation.latitude,newLocation.longitude];
let SQL=`INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4)`;
client.query(SQL,queryValues).then(result => { 
    res.send(newLocation);

});

    });

};

});

});


// http://localhost:3000/weather?lon=333&lat=4343
app.get('/weather', (request, response) => {
    let latitudee = request.query.lat;
    let longitudee = request.query.lon;
    
        let weatherKey = process.env.WEATHER_API_KEY;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitudee}&lon=${longitudee}&key=${weatherKey}`;
    
        superagent.get(url)
            .then(data2 => {
                const weaherInfo=[];
                data2.body.data.map(element => {
                    let newWather = new Weather(element);
                    weaherInfo.push(newWather);

                });
                response.send(weaherInfo);

            });
        });


    let selectSQL =`SELECT * FROM locations WHERE lat=${latitude} & lon=${longitude}`;

    client.query(selectSQL).then(result=>{
if(result.rowCount){
    res.send(result);
}
else{
    superagent.get(url)
    .then(data2 => {
        const weaherInfo=[];
        data2.body.data.map(element => {
            let newWather = new Weather(element);
            weaherInfo.push(newWather);
let queryValues=[newWather.search_query,newWather.formatted_query,newLocation.latitude,newLocation.longitude];
let SQL=`INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4)`;
client.query(SQL,queryValues).then(result => { 
    response.send(weaherInfo);

});

    });

};

});

});



client.connect().then(() => {

    app.listen(PORT, () => {
        console.log('I am listning to port', PORT);
    }); 
}); 
