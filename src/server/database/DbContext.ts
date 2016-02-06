"use strict";

import {Repository} from "./Repository";

// Constructor
export class DbContext
{
    // DbContext.models gets populated when app inits
    public static models;

    // DbContext.repositories gets populated when app inits
    private static repositories = {};

    // Called after all models have been initialized
    public static onModelsCreated()
    {
        var models = DbContext.models;

        // User 1---* Passport
        models.User.hasMany(models.Passport, "passports", "id", "userId");

        // Init the repositories
        DbContext.initRepostories();
    }

    private static initRepostories()
    {
        var models = DbContext.models;

        for (var model in models)
        {
            if (!models.hasOwnProperty(model))
                continue;

            DbContext.repositories[model] = new Repository(models[model]);
        }
    }

    // Get a repository by its name
    public static getRepository(repositoryName)
    {
        return DbContext.repositories[repositoryName];
    }
}