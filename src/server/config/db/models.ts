"use strict";

import path = require("path");
import recursiveReaddirSync = require("recursive-readdir-sync");

import {Config} from "../config";

var config = Config.current;

export class ModelsConfig
{
    public static loadModels()
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
    }
}