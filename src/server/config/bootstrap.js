var bodyParser = require("body-parser");

var bootstrap = function(app, config)
{
    console.log("=> Bootstrapping application...");

    // Setup app global variables
    global.ClassE = {
        config: config
    };

    // Setup async/await
    global.async = require("asyncawait/async");
    global.await = require("asyncawait/await");

    // Configure express middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Connect to MongoDB
    require("./db/db")(config);

    // Setup authentication
    require("./auth/auth")(app);

    // Setup routes
    require("./routes/routes")(app, config);
};

module.exports = bootstrap;