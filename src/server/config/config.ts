import path = require("path");

export class Config
{
    private static rootPath = path.normalize("..");
    private static appSecret = process.env.SECRET || "asdfghjkl";
    private static authCookieName = "classe.presence";

    private static appConfig = {
        development: {
            rootPath: Config.rootPath,
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
            rootPath: Config.rootPath,
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