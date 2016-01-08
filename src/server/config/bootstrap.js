var feathers = require("feathers");
var bodyParser = require("body-parser");

var bootstrap = function(app, config)
{
    app.configure(function()
    {
        // Configure REST and SocketIO endpointss
        app.configure(feathers.rest());
        app.configure(feathers.socketio());

        // Parse JSON and form HTTP bodies
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Server public files
        app.set(feathers.static(config.rootPath + "/public"));
    });

    app.configure(feathers.rest());
};

module.exports = bootstrap;