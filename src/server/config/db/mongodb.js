var mongorito = require("mongorito");

var mongodb = function(config)
{
    console.log("=> Connecting to MongoDB...");

    mongorito.connect(config.dbUrl);
};

module.exports = mongodb;