"use strict";

import path = require("path");

export class Config
{
    private static appSecret = process.env.SECRET || "asdfghjkl";
    private static authCookieName = "classe.presence";

    private static appConfig = {
        development: {
            port: process.env.PORT || 3960,
            cors: {
                origin: "http://localhost:3970",
                credentials: true
            },
            jwt: {
                secret: Config.appSecret,
                expiryInMinutes: 60,
                cookie: {
                    name: Config.authCookieName,
                    options: {
                        httpOnly: true,
                        secure: false
                    }
                }
            },
            thinky: {
                host: "localhost",
                port: 28015,
                db: "ClassE"
            }
        },
        production: {
            port: 80,
            cors: {
                origin: "http://localhost:3970",
                credentials: true
            },
            jwt: {
                secret: Config.appSecret,
                expiryInMinutes: 30,
                cookie: {
                    name: Config.authCookieName,
                    options: {
                        httpOnly: true,
                        secure: true
                    }
                }
            },
            thinky: {
                host: "localhost",
                port: 28015,
                db: "ClassE"
            }
        }
    };

    public static current;

    public static init(env)
    {
        Config.current = Config.appConfig[env];
    }
}