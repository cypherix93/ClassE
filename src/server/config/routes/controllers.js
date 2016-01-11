"use strict";

var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var config = ClassE.config;

var controllers = function (app)
{
    var ctrlDir = path.join(config.rootPath, "/controllers");
    var files = recursiveReaddirSync(ctrlDir);

    for (let file of files)
    {
        let ctrlFile = path.basename(file)
            .replace(/\.js/g, "");

        let controller = require(path.join(ctrlDir, ctrlFile));

        app.use("/" + ctrlFile, controller);
    }
};

module.exports = controllers;