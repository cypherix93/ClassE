var thinky = require("thinky");

var dbConfig = function (config)
{
    console.log("=> Connecting to RethinkDB...");

    global.thinky = thinky(config.thinky);

    // Hook up models
    require("./models")(config);

    // Seed database
    require("./seed")();
};

module.exports = dbConfig;