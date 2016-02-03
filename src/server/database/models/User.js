"use strict";

var shortid = require("shortid");

var thinky = ClassE.thinky;
var type = thinky.type;
var models = ClassE.models;

var User = thinky.createModel("User",
    {
        id: type.string()
            .default(shortid.generate),

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

module.exports = User;