"use strict";

var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");
var router = require("express-promise-router");

var controllersConfig = function (app)
{
    var ctrlsDir = path.join(ClassE.config.rootPath, "controllers");

    var files = recursiveReaddirSync(ctrlsDir);
    for (let file of files)
    {
        let relative = path.relative(ctrlsDir, file);
        let parsed = path.parse(relative);

        // Build the base route that the controller will be mounted on
        let ctrlRouteBase = !!parsed.dir ? "/" + parsed.dir + "/" : "/";
        ctrlRouteBase += parsed.name;

        // Let's get the controller instance and hook the router up
        let routerInstance = router();
        require(file)(routerInstance);

        // Mount the controller instance the Route base
        app.use(ctrlRouteBase, routerInstance);
    }
};

module.exports = controllersConfig;