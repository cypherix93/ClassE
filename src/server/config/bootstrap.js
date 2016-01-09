var bodyParser = require("body-parser");

var bootstrap = function(app, config)
{
    console.log("=> Bootstrapping application...");

    // Connect to MongoDB
    require("./mongodb")(config);

    // Configure express middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup routes
    require("./routes")(app, config);
};

module.exports = bootstrap;