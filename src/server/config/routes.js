var feathers = require("feathers");

var routes = function(app, config)
{
    // Server public files
    app.use("/", feathers.static(config.rootPath + "/public"));
};

module.exports = routes;