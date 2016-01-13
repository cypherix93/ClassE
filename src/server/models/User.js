"use strict";

var thinky = ClassE.thinky;
var type = thinky.type;
var models = ClassE.models;

var User = thinky.createModel("User",
    {
        email: type.string()
            .email()
            .required(),

        createdAt: type.date()
            .default(thinky.r.now()),

        roles: type.array()
            .schema(type.string())
            .default(["User"])
    });

User.ensureIndex("email");

User.hasMany(models.Passport, "passports", "id", "userId");

module.exports = User;