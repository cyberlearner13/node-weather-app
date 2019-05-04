const request = require('request');
const apiKey = require('../api/api_key');

const weather = (lat,long,callback) => {
  let reqObj = {
    url:`https://api.darksky.net/forecast/${apiKey}/${lat},${long}?units=si`,
    json:true
  }
  request(reqObj, (err,res)=>{
    if(err){
      callback('Unable to reach weather API!',undefined)
    }
    else if(res.body.error){
      callback(res.body.error,undefined)
    }
    else{
      callback(undefined,res)
    }
  })
}

module.exports = weather;
