"use strict";

var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var modelsConfig = function(config)
{
    // Dynamically load models and attach them to global 'models' namespace
    global.models = {};

    var files = recursiveReaddirSync("./src/server/models");
    for (let file of files)
    {
        let modelFile = file
            .replace(/\\/g, "/")
            .replace("src/server/models/", "")
            .replace(/\.js/g, "");

        let model = require(path.join(config.rootPath, "/server/models/", modelFile));

        global.models[modelFile] = model;
    }
};

module.exports = modelsConfig;