"use strict";

import cookieParser = require("cookie-parser");
import cors = require("cors");

import {PassportConfig} from "./PassportConfig";
import {Config} from "../Config";

export class AuthConfig
{
    public static init(app)
    {
        console.log("=> Setting up Auth...");

        //Hook up the auth related middlewares
        app.use(cookieParser());
        app.use(cors(Config.current.cors));

        // Setup Passport
        PassportConfig.init(app);

        // Setup JSON Web Token auth flow
        app.use(AuthHelper.initJWTokenMiddleware);
    }
}