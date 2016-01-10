var thinky = require("thinky");

var config = ClassE.config;

var dbConfig = function ()
{
    console.log("=> Connecting to RethinkDB...");

    global.ClassE.thinky = thinky(config.thinky);

    // Hook up models
    require("./models")();

    // Seed database
    require("./seed")();
};

module.exports = dbConfig;