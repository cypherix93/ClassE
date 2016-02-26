import {Repository} from "./Repository";

// Constructor
export class DbContext
{
    // Instance of rethinkdb context
    public static thinky;

    // DbContext.models gets populated when app inits
    public static models;

    // DbContext.repositories gets populated when app inits
    public static repositories;

    // Called after all models have been initialized
    // all relations go here?
    public static onModelsCreated()
    {
        var models = DbContext.models;

        // User 1---* Passport
        models.User.hasMany(models.Passport, "passports", "id", "userId");
    }
}
