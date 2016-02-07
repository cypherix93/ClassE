"use strict";

import passport = require("passport");

import {Express} from "express";
import {PassportLocalConfig} from "./PassportLocalConfig";

export class PassportConfig
{
    public static init(app:Express)
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