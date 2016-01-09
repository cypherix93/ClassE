"use strict";

var express = require("express");
var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var routes = function (app, config)
{
    console.log("=> Setting up Routes...");

    // Serve public files
    var publicDir = path.join(config.rootPath, "public");
    app.use("/", express.static(publicDir));

    // Dynamically load controllers
    var files = recursiveReaddirSync("./src/server/controllers");
    for (let file of files)
    {
        let controllerPath = file
            .replace(/\\/g, "/")
            .replace("src/server/controllers", "")
            .replace(/\.js/g, "");

        let controller = require(path.join(config.rootPath,"/server/controllers", controllerPath));

        app.use(controllerPath, controller);
    }

    // Setup error pages
    require("./errors")(app);
};

module.exports = routes;