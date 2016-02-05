"use strict";

var path = require("path");
var recursiveReaddirSync = require("recursive-readdir-sync");

var config = ClassE.config;

var modelsConfig = function()
{
    var models = {};

    // Dynamically load models
    var modelsDir = path.join(config.rootPath, "database/models");

    var files = recursiveReaddirSync(modelsDir);
    for (let file of files)
    {
        let modelFile = path.basename(file, ".js");

        let model = require(path.join(modelsDir, modelFile));

        models[modelFile] = model;
    }

    return models;
};

module.exports = modelsConfig;
