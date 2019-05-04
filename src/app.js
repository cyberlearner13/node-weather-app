const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();
app.set("view engine", "hbs");

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars view engine and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Arkadeep Mukherjee"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Arkadeep Mukherjee"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Arkadeep Mukherjee"
    });
});

app.get("/weather", (req, response) =>{
    if(!req.query.address){
        return response.send({
            "error":"You must provide an address"
        })
    }
    geocode(req.query.address,(err, {latitude,longtitude,location}={})=>{
        if(err){
            return response.send({
                error:'Some error in fetching geocode of the address',
            })
        }
        weather(latitude,longtitude,(err,data)=>{
            if(err){
                return response.send({
                    error:'Some error in fetching weather data of the address',
                })
            }

              const {temperature,precipProbability} = data.body.currently;
              let forecast = `It is ${temperature} degress out in ${location}. There's ${precipProbability} % chance of rain`;
              response.send({ forecast,location,address: req.query.address })
          });
      });
});

app.get("/help/*",(req,res)=>{
    res.render('404',{
        title: "Help 404",
        name: "Arkadeep Mukherjee",
        message:"Help article not found"
    })
})

app.get("*",(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Arkadeep Mukherjee",
        message:"Help article not found"
    })
})

app.listen(3000, () => console.log("server started at port 3000"));
