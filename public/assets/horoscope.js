const express = require("express");

const router = express.Router();

const horoscope = require("../models/index.js");

var userId = "615899";
var apiKey = "8d7a9a179b563db728b3e2c7fabdb85a";
var data = "JSON Request Data";
var request = $.ajax({
  url: "https://json.astrologyapi.com/v1/" + api,
  method: "POST",
  dataType: "json",
  headers: {
    authorization: "Basic " + btoa(userId + ":" + apiKey),
    "Content-Type": "application/json",
  },
  data: JSON.stringify(data),
});
// Returns A promiss
return request.then(
  function (resp) {
    return resp;
  },
  function (err) {
    return err;
  }
);
