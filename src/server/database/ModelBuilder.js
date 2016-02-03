"use strict";

var ModelBuilder = function(models)
{
    // Init the relationships between models here

    // User 1---* Passport
    models.User.hasMany(models.Passport, "passports", "id", "userId");
};

module.exports = ModelBuilder;
