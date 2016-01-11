"use strict";

var express = require("express");
var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var config = ClassE.config;

var routes = function (app)
{
    console.log("=> Setting up Routes...");

    var ctrlDir = path.join(config.rootPath, "/controllers");

    // Dynamically load controllers
    var files = recursiveReaddirSync(ctrlDir);
    for (let file of files)
    {
        let ctrlFile = path.basename(file)
            .replace(/\.js/g, "");

        let controller = require(path.join(ctrlDir, ctrlFile));

        app.use("/" + ctrlFile, controller);
    }

    // Setup error pages
    require("./errors")(app);
};

module.exports = routes;