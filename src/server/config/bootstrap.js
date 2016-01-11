var bodyParser = require("body-parser");

var bootstrap = function(app, config)
{
    console.log("=> Bootstrapping application...");

    // Setup app global variables
    global.ClassE = {
        config: config
    };

    // Configure express middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Connect to RethinkDB
    require("./db/db")();

    // Setup authentication
    require("./auth/auth")(app);

    // Setup routes
    require("./routes/routes")(app);
};

module.exports = bootstrap;