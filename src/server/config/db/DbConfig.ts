const thinky = require("thinky");

import {Config} from "../Config";
import {ModelsConfig} from "./ModelsConfig";
import {DbContext} from "../../database/DbContext";
import {Repository} from "../../database/Repository";
import {Logger} from "../../helpers/Logger";

var config = Config.current;

export class DbConfig
{
    public static init()
    {
        Logger.info("Connecting to RethinkDB...");

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
        DbContext.repositories = {};

        for (let model in models)
        {
            if (!models.hasOwnProperty(model))
                continue;

            // Check if a model-specific repository exists, if not make default one
            let repoName = model + "Repository";

            let modelRepo;
            try
            {
                let repoModule = require("../../database/repositories/" + repoName);

                if(repoModule[repoName])
                    modelRepo = repoModule[repoName];
            }
            catch(err)
            {
                modelRepo = Repository;
            }

            // Set it to DbContext
            DbContext.repositories[model] = new modelRepo(models[model]);
        }
    }
}