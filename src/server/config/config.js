var path = require("path");

var rootPath = path.normalize(__dirname + "/..");

var appSecret = process.env.SECRET || "asdfghjkl";
var authCookieName = "classe.presence";

var appConfig = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3960,
        cors: {
            origin: "http://localhost:3970",
            credentials: true
        },
        jwt: {
            secret: appSecret,
            expiryInMinutes: 60,
            cookie: {
                name: authCookieName,
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
        rootPath: rootPath,
        port: 80,
        cors: {
            origin: "http://localhost:3970",
            credentials: true
        },
        jwt: {
            secret: appSecret,
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
    }
};

module.exports = appConfig;