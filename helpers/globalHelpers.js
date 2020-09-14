"use strict";

const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", function () {
  console.log("database connected");
});
// Event when there is an error connecting for database
mongoose.connection.on("error", function (err) {
  console.log(err);
});

global.connection = mongoose.connection;

global.baseUrl = "https://api.zoom.us/v2";
module.exports = {};
