var feathers = require("feathers");

var app = feathers();

// Pull in the configuration for the current environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var config = require("./config/config")[env];

// Bootstrap the application and couple the middlewares
require("./config/bootstrap")(app, config);

// Setup routes
require("./config/routes")(app);



// Start up the server
app.listen(config.port);
console.log("Magic is happening at localhost:" + config.port);