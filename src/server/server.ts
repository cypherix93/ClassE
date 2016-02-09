/// <reference path="../../typings/main.d.ts" />

import express = require("express");

import {Config} from "./config/Config";

// Initialize Config for the current environment
Config.init(process.env.NODE_ENV = process.env.NODE_ENV || "development");

import {Bootstrap} from "./config/Bootstrap";

class Server
{
    constructor()
    {
        var app = express();

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