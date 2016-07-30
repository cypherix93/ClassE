import path = require("path");

const rootPath = path.normalize(__dirname + "/../..");
const authCookieName = "classe.presence";

const config = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3960,
        cors: {
            origin: process.env.CLIENT_URL || ["http://localhost:3970", "http://127.0.0.1:3970"],
            credentials: true
        },
        winston: {
            level: "debug"
        },
        jwt: {
            secret: process.env.JWT_SECRET || "asdfghjkl",
            expiryInMinutes: 30,
            cookie: {
                name: authCookieName,
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
    },
    production: {
        rootPath: rootPath,
        port: 80,
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        },
        winston: {
            level: "info"
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            expiryInMinutes: 30,
            cookie: {
                name: authCookieName,
                options: {
                    httpOnly: true,
                    secure: true
                }
            }
        },
        thinky: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            db: process.env.DB_DATABASE
        }
    }
};

class Configuration
{
    public current;

    public environment:string;

    constructor(environment)
    {
        this.environment = environment.toLowerCase();

        if (this.isProduction())
        {
            this.current = config.production;
        }
        else
        {
            this.current = config.development;
        }
    }

    public isProduction()
    {
        return this.environment === "production";
    }

    public isDevelopment()
    {
        return this.environment !== "production";
    }
}

export const Config = new Configuration(process.env.NODE_ENV || "development");