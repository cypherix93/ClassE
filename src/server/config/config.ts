"use strict";

import path = require("path");

namespace ClassE.Config
{
    export class Config
    {
        private rootPath = path.normalize(__dirname + "..");
        private appSecret = process.env.SECRET || "asdfghjkl";
        private authCookieName = "classe.presence";

        public static current;

        private appConfig = {
            development: {
                rootPath: this.rootPath,
                port: process.env.PORT || 3960,
                cors: {
                    origin: "http://localhost:3970",
                    credentials: true
                },
                jwt: {
                    secret: this.appSecret,
                    expiryInMinutes: 60,
                    cookie: {
                        name: this.authCookieName,
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
                rootPath: this.rootPath,
                port: 80,
                cors: {
                    origin: "http://localhost:3970",
                    credentials: true
                },
                jwt: {
                    secret: this.appSecret,
                    expiryInMinutes: 30,
                    cookie: {
                        name: this.authCookieName,
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

        public static init(env)
        {
            this.current = this.appConfig[env];
        }
    }
}