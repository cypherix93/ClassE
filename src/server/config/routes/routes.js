"use strict";

var express = require("express");
var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var routes = function (app, config)
{
    console.log("=> Setting up Routes...");

    // Dynamically load controllers
    var files = recursiveReaddirSync("./src/server/controllers");
    for (let file of files)
    {
        let controllerUrl = file
            .replace(/\\/g, "/")
            .replace("src/server/controllers", "")
            .replace(/\.js/g, "");

        let controller = require(path.join(config.rootPath,"/server/controllers", controllerUrl));

        app.use(controllerUrl, controller);
    }

    // Setup error pages
    require("./errors")(app);
};

module.exports = routes;