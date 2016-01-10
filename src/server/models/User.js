"use strict";

var type = thinky.type;

var User = thinky.createModel("User",
    {
        username: type.string(),
        email: type.string(),

        roles: [type.string()]
    });

User.hasMany(models.Passport, "passports", "id", "userId");

module.exports = User;