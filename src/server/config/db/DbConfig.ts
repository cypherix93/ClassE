import thinky = require("thinky");

import {Config} from "../Config";
import {ModelsConfig} from "./ModelsConfig";
import {DbContext} from "../../database/DbContext";

var config = Config.current;

export class DbConfig
{
    public static init()
    {
        console.log("=> Connecting to RethinkDB...");

        // Open connection to RethinkDB
        DbContext.thinky = thinky(config.thinky);

        // Hook up models and set them to context
        DbContext.models = ModelsConfig.init();

        // Call models created function
        DbContext.onModelsCreated();
    }
}