var feathers = require("feathers");
var bodyParser = require("body-parser");

var bootstrap = function(app, config)
{
    // Configure REST and SocketIO endpoints
    app.configure(feathers.rest());
    app.configure(feathers.socketio());

    // Parse JSON and form HTTP bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup routes
    require("./routes")(app, config);
};

module.exports = bootstrap;