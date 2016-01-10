"use strict";

var bcrypt = require("bcryptjs");

var type = thinky.type;

// Don't touch anything here because this is used for Authentication.
var Passport = thinky.createModel("Passport",
    {
        // Required field: Protocol (e.g. 'oauth', 'oauth2', 'openid').
        protocol: type.string().alphanum().required(),

        password: type.string().min(8),
        accessToken: type.string(),

        provider: type.string(),
        identifier: type.string(),
        tokens: type.object(),

        // Associations
        userId: type.string().required()
    });

// Validate password function
Passport.define("validatePassword", function (password)
{
    return bcrypt.compareSync(password, this.Password);
});

module.exports = Passport;