"use strict";

import bodyParser = require("body-parser");
import lodash = require("lodash");
import Q = require("q");

import DbConfig from "./db/db";
import AuthConfig = require("./auth/auth");
import RoutesConfig = require("./routes/routes");

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
        AuthConfig(app);

        // Setup routes
        RoutesConfig(app);
    }
}