/// <reference path="./content/typings/typings/main.d.ts" />

"use strict";

import express = require("express");
import Config = require("./config/config");
import Bootstrap = require("./config/bootstrap")

namespace ClassE
{
    class Startup
    {
        constructor()
        {
            var app = express();

            // Pull in the configuration for the current environment
            var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

            // Initialize Config that sets Config.config to the environment configuration
            Config.init(env);

            // Bootstrap the application and couple the middlewares
            Bootstrap.init(app);

            // Start up the server
            console.log("=> Starting Server...");
            app.listen(config.port, function()
            {
                console.log("\nMagic is happening at http://localhost:" + config.port);
            });
        }
    }
}

export = new Startup();