"use strict";

import bodyParser = require("body-parser");
import lodash = require("lodash");
import Q = require("q");

import {DbConfig} from "./db/DbConfig";
import {AuthConfig} from "./auth/AuthConfig";
import {RoutesConfig} from "./routes/RoutesConfig";

// Tell Typescript we have node's 'global' available
declare var global;

export class Bootstrap
{
    public static init(app)
    {
        console.log("=> Bootstrapping application...");

        // Setup app global variables
        global._ = lodash;
        global.Q = Q;

        // Configure express middlewares
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // Connect to RethinkDB
        DbConfig.init();

        // Setup authentication
        AuthConfig.init(app);

        // Setup routes
        RoutesConfig.init(app);
    }
}