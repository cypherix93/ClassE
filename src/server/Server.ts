/// <reference path="../../typings/index.d.ts" />

import express = require("express");

import {Config} from "./config/Config";
import {Bootstrap} from "./config/Bootstrap";
import {Logger} from "./helpers/Logger";

export class Server
{
    public static main()
    {
        var app = express();

        // Bootstrap the application and couple the middlewares
        Bootstrap.init(app);

        // Start up the server
        Logger.info("Starting Server...");

        var port = Config.current.port;
        app.listen(port, function ()
        {
            Logger.info("Magic is happening at http://localhost:" + port);
        });
    }
}
// Start app
Server.main();