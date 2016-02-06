"use strict";

import bodyParser = require("body-parser");
import lodash = require("lodash");
import Q = require("q");

import dbConfig = require("./db/db");
import authConfig = require("./auth/auth");
import routesConfig = require("./routes/routes");

namespace ClassE.config
{
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
            app.use(bodyParser.urlencoded({ extended: true }));

            // Connect to RethinkDB
            dbConfig();

            // Setup authentication
            authConfig(app);

            // Setup routes
            routesConfig(app);
        }
    }
}