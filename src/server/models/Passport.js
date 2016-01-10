"use strict";

var bcrypt = require("bcryptjs");

var type = thinky.type;

// Don't touch anything here because this is used for Authentication.
var Passport = thinky.createModel("Passport",
    {
        Id: type.string(),

        // Required field: Protocol (e.g. 'oauth', 'oauth2', 'openid').
        Protocol: type.string().alphanum().required(),

        Password: type.string().min(8),
        AccessToken: type.string(),

        Provider: type.string(),
        Identifier: type.string(),
        Tokens: type.object(),

        // Associations
        UserId: type.string().required()
    },
    {
        pk: "Id" // Set Id as the primary key
    });

// Validate password function
Passport.define("validatePassword", function (password)
{
    return bcrypt.compareSync(password, this.Password);
});

module.exports = Passport;