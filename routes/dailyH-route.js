const express = require("express");
const router = express.Router();
const passport = require("passport");

module.exports = (app) => {
  //route loads horoscope.js file
  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "..../public/horoscope.js"))
  );
};
