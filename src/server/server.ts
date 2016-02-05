/// <reference path="./content/typings/typings/main.d.ts" />

var express = require("express");

var app = express();

// Pull in the configuration for the current environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var config = require("./config/config")[env];

// Bootstrap the application and couple the middlewares
require("./config/bootstrap")(app, config);


// Start up the server
console.log("=> Starting Server...");
app.listen(config.port, function()
{
    console.log("\nMagic is happening at http://localhost:" + config.port);
});