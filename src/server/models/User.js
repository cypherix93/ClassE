"use strict";

var type = thinky.type;

var User = thinky.createModel("User",
    {
        Id: type.string(),

        Username: type.string(),
        Email: type.string(),

        Roles: [type.string()]
    },
    {
        pk: "Id" // Set Id as the primary key
    });

User.hasMany(models.Passport, "Passports", "Id", "UserId");

module.exports = User;