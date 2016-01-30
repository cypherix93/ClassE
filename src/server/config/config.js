var path = require("path");

var rootPath = path.normalize(__dirname + "/..");

var appSecret = process.env.SECRET || "asdfghjkl";
var authCookieName = "classe.presence";

var appConfig = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3960,
        secret: appSecret,
        cors: {
            origin: "http://localhost:3970",
            credentials: true
        },
        cookie: {
            name: authCookieName,
            options: {
                httpOnly: true,
                secure: false
            }
        },
        thinky: {
            host: "192.168.1.125",
            port: 28015,
            db: "ClassE"
        }
    },
    production: {
        rootPath: rootPath,
        port: 80,
        secret: appSecret,
        cors: {
            origin: "http://localhost:3970",
            credentials: true
        },
        cookie: {
            name: authCookieName,
            httpOnly: true,
            secure: true
        },
        thinky: {
            host: "192.168.1.125",
            port: 28015,
            db: "ClassE"
        }
    }
};

module.exports = appConfig;