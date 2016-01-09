var bodyParser = require("body-parser");

var bootstrap = function(app, config)
{
    console.log("=> Bootstrapping application...");

    // Connect to MongoDB
    require("./db/mongodb")(config);

    // Configure express middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup authentication
    require("./auth/auth")(app);

    // Setup routes
    require("./routes/routes")(app, config);
};

module.exports = bootstrap;