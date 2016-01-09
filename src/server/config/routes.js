var feathers = require("feathers");

var routes = function(app, config)
{
    console.log("=> Setting up Routes...");

    // Server public files
    app.use("/", feathers.static(config.rootPath + "/public"));
};

module.exports = routes;