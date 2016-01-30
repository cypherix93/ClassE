var path = require("path");

var rootPath = path.normalize(__dirname + "/..");

var appConfig = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3960,
        secret: "asdfghjkl",
        cors: {
            origin: "http://localhost:3970",
            credentials: true
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
        secret: process.env.SECRET,
        cors: {
            origin: "http://localhost:3970",
            credentials: true
        },
        thinky: {
            host: "192.168.1.125",
            port: 28015,
            db: "ClassE"
        }
    }
};

module.exports = appConfig;