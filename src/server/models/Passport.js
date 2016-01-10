"use strict";

var bcrypt = require("bcryptjs");

var thinky = ClassE.thinky;
var type = thinky.type;
var models = ClassE.models;

var passwordMinLength = 8;

// Don't touch anything here because this is used for Authentication.
var Passport = thinky.createModel("Passport",
    {
        // Required field: Protocol (e.g. 'oauth', 'oauth2', 'openid').
        protocol: type.string().alphanum().required(),

        password: type.string().min(passwordMinLength),
        accessToken: type.string(),

        provider: type.string(),
        identifier: type.string(),
        tokens: type.object(),

        // Associations
        userId: type.string().required()
    });

// Get password min length allowed
Passport.defineStatic("getPasswordMinLength", function()
{
    return passwordMinLength;
});

// Validate password function
Passport.define("validatePassword", function (password)
{
    return bcrypt.compareSync(password, this.Password);
});

module.exports = Passport;