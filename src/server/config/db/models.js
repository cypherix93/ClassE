"use strict";

var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var config = ClassE.config;

var modelsConfig = function()
{
    // Dynamically load models and attach them to global 'models' namespace
    global.ClassE.models = {};

    var modelsDir = path.join(config.rootPath, "database/models");

    var files = recursiveReaddirSync(modelsDir);
    for (let file of files)
    {
        let modelFile = path.basename(file, ".js");

        let model = require(path.join(modelsDir, modelFile));

        ClassE.models[modelFile] = model;
    }
};

module.exports = modelsConfig;
