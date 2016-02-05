var thinky = require("thinky");

var config = ClassE.config;

var DbContext = require(ClassE.config.rootPath + "/database/DbContext");

var dbConfig = function ()
{
    console.log("=> Connecting to RethinkDB...");

    global.ClassE.thinky = thinky(config.thinky);

    // Hook up models and set them to context
    DbContext.models = require("./models")();

    // Call models created function
    DbContext.onModelsCreated();
};

module.exports = dbConfig;