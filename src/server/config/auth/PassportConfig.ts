"use strict";

import passport = require("passport");

import {PassportLocalConfig} from "./PassportLocalConfig";

export class PassportConfig
{
    public static init(app)
    {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function(user, callback)
        {
            callback(null, user);
        });
        passport.deserializeUser(function(user, callback)
        {
            callback(null, user);
        });

        // Setup strategies for Passport
        PassportLocalConfig.init(passport);
    }
}