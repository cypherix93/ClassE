/// <reference path="../../typings/main.d.ts" />

import express = require("express");

import {Config} from "./config/Config";
import {Bootstrap} from "./config/Bootstrap";

class Server
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

        var port = Config.current.port;
        app.listen(port, function ()
        {
            console.log("\nMagic is happening at http://localhost:" + port);
        });
    }
}
export = new Server();