"use strict";

var feathers = require("feathers");
var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var routes = function (app, config)
{
    console.log("=> Setting up Routes...");

    // Serve public files
    app.use("/", feathers.static(path.join(config.rootPath, "public")));

    // Dynamically load controllers
    var files = recursiveReaddirSync("./src/server/controllers");
    for (let file of files)
    {
        let controllerPath = file
            .replace(/\\/g, "/")
            .replace("src/server/controllers", "")
            .replace(/\.js/g, "");

        let controller = require("../controllers" + controllerPath);

        for (let prop in controller)
        {
            if (!controller.hasOwnProperty(prop))
                continue;

            var action = controller[prop];

            app.use(controllerPath + "/" + prop, action);
        }
    }
};

module.exports = routes;