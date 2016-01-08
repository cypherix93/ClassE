var path = require("path");
var rootPath = path.normalize(__dirname + "../../");

var config = {
    development: {
        rootPath: rootPath,
        db: "",
        port: process.env.PORT || 3960
    },
    production: {
        rootPath: rootPath,
        db: "",
        port: process.env.PORT || 80
    }
};

module.exports = config;