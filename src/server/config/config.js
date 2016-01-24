var path = require("path");

var rootPath = path.normalize(__dirname + "/..");

var appConfig = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3960,
        cors: {
            origin: "http://localhost:3970"
        },
        thinky: {
            host: "192.168.1.125",
            port: 28015,
            db: "ClassE"
        }
    },
    production: {
        rootPath: rootPath,
        port: process.env.PORT || 80,
        cors: {
            origin: "http://localhost:3970"
        },
        thinky: {
            host: "192.168.1.125",
            port: 28015,
            db: "ClassE"
        }
    }
};

module.exports = appConfig;