import {Express} from "express";

import path = require("path");
import recursiveReaddirSync = require("recursive-readdir-sync");
import router = require("express-promise-router");

import {Config} from "../Config";

export class ControllersConfig
{
    public static init(app:Express)
    {
        var ctrlsDir = path.join(Config.current.rootPath, "controllers");

        var files = recursiveReaddirSync(ctrlsDir);
        for (let file of files)
        {
            let relative = path.relative(ctrlsDir, file);
            let parsed = path.parse(relative);

            // Build the base route that the controller will be mounted on
            let ctrlRouteBase = !!parsed.dir ? "/" + parsed.dir + "/" : "/";
            ctrlRouteBase += parsed.name;

            // The route path should always be in lower case
            ctrlRouteBase = ctrlRouteBase.toLowerCase();

            // Let's get the controller instance and hook the router up
            let routerInstance = router();
            require(file)(routerInstance);

            // Mount the controller instance the Route base
            app.use(ctrlRouteBase, routerInstance);
        }
    }
}