const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Bart"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Bart"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "ahoj zolnierzu",
    title: "Help",
    name: "Bart"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide address ziom!"
    });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, latitude, placeName } = {}) => {
        if (error) {
          return res.send({
            error
          });
        }
        forecast(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location: placeName,
            address: req.query.address
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Bart",
    message404: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bart",
    message404: "My 404 page"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});