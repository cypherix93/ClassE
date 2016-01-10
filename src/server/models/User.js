"use strict";

var thinky = ClassE.thinky;
var type = thinky.type;
var models = ClassE.models;

var User = thinky.createModel("User",
    {
        username: type.string(),
        email: type.string(),

        roles: [type.string()]
    });

User.ensureIndex("username");
User.ensureIndex("email");

User.hasMany(models.Passport, "passports", "id", "userId");

module.exports = User;