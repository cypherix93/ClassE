"use strict";

import cookieParser = require("cookie-parser");
import cors = require("cors");

import {Config} from "../Config";
import {PassportConfig} from "./PassportConfig";
import {AuthHelper} from "../../helpers/AuthHelper";

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