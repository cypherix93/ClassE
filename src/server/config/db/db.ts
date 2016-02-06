"use strict";

import thinky = require("thinky");

import {Config} from "../config";
import {ModelsConfig} from "./models";
import {DbContext} from "../../database/DbContext";

var config = Config.current;

export default class DbConfig
{
    public static init()
    {
        console.log("=> Connecting to RethinkDB...");

        ClassE.thinky = thinky(config.thinky);

        // Hook up models and set them to context
        DbContext.models = ModelsConfig.loadModels();

        // Call models created function
        DbContext.onModelsCreated();
    }
}