var thinky = require("thinky");

var config = ClassE.config;

var dbConfig = function ()
{
    console.log("=> Connecting to RethinkDB...");

    global.ClassE.thinky = thinky(config.thinky);

    // Hook up models
    require("./models")();

    // Call DB model builder
    require(ClassE.config.rootPath + "/database/ModelBuilder")(ClassE.models);
};

module.exports = dbConfig;