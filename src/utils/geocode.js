const request = require('request');
const token = require('../api/token');

const geocode = (address,callback) => {
  let reqObj = {
     url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`,
     json:true
  }
  request(reqObj,(err,res) => {
    if(err){
      callback('Unable to connect to location services',undefined)
    }
    else if(res.body.features.length === 0){
        callback('Enter valid search term',undefined)
    }
    else{
      callback(err,{
        longtitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name
      });
    }
  });

}

module.exports = geocode;
