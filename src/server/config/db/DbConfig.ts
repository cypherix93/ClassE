import thinky = require("thinky");

import {Config} from "../Config";
import {ModelsConfig} from "./ModelsConfig";
import {DbContext} from "../../database/DbContext";
import {Repository} from "../../database/Repository";

var config = Config.current;

export class DbConfig
{
    public static init()
    {
        console.log("=> Connecting to RethinkDB...");

        // Open connection to RethinkDB
        DbContext.thinky = thinky(config.thinky);

        DbConfig.initModels();
        DbConfig.initRepositories();
    }

    private static initModels()
    {
        // Hook up models and set them to context
        DbContext.models = ModelsConfig.init();

        // Call models created function
        DbContext.onModelsCreated();
    }

    private static initRepositories()
    {
        // Hook up the repositories around the models
        var models = DbContext.models;

        for (var model in models)
        {
            if (!models.hasOwnProperty(model))
                continue;

            DbContext.repositories[model] = new Repository(models[model]);
        }
    }
}