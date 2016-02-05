"use strict";

var Repository = require("./Repository");

// Constructor
class DbContext
{
    // DbContext.models gets populated when app inits
    private static models;

    // DbContext.repositories gets populated when app inits
    private static repositories = {};

    // Called after all models have been initialized
    public static onModelsCreated()
    {
        var models = this.models;

        // User 1---* Passport
        models.User.hasMany(models.Passport, "passports", "id", "userId");



        // Init the repositories
        this.initRepostories();
    }

    private static initRepostories()
    {
        for (var model in this.models)
        {
            if (!this.models.hasOwnProperty(model))
                continue;

            this.repositories[model] = new Repository(this.models[model]);
        }
    }

    // Get a repository by its name
    public static getRepository(repositoryName)
    {
        return this.repositories[repositoryName];
    }
}

export = DbContext;