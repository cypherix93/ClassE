var path = require("path");

var rootPath = path.normalize(__dirname + "/..");

var appConfig = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3960,
        thinky: {
            host: "192.168.1.108",
            port: 28015,
            db: "ClassE"
        }
    },
    production: {
        rootPath: rootPath,
        port: process.env.PORT || 80,
        thinky: {
            host: "192.168.1.108",
            port: 28015,
            db: "ClassE"
        }
    }
};

module.exports = appConfig;