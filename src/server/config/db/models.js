"use strict";

var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var config = ClassE.config;

var modelsConfig = function()
{
    // Dynamically load models and attach them to global 'models' namespace
    global.ClassE.models = {};

    var modelsDir = path.join(config.rootPath, "/models");

    var files = recursiveReaddirSync(modelsDir);
    for (let file of files)
    {
        let modelFile = path.basename(file)
            .replace(/\.js/g, "");

        let model = require(path.join(modelsDir, modelFile));

        global.ClassE.models[modelFile] = model;
    }
};

module.exports = modelsConfig;
