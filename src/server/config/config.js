var path = require("path");

var rootPath = path.normalize(__dirname + "/../..");

var config = {
    development: {
        rootPath: rootPath,
        dbUrl: "localhost:27017/ClassE",
        port: process.env.PORT || 3960
    },
    production: {
        rootPath: rootPath,
        dbUrl: "",
        port: process.env.PORT || 80
    }
};

module.exports = config;