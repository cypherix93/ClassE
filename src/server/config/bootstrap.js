var bodyParser = require("body-parser");
var cors = require("cors");

var bootstrapConfig = function(app, config)
{
    console.log("=> Bootstrapping application...");

    // Setup app global variables
    global._ = require("lodash");

    // Our global app namespace
    global.ClassE = {
        config: config
    };

    // Configure express middlewares
    app.use(cors(config.cors));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Connect to RethinkDB
    require("./db/db")();

    // Setup authentication
    require("./auth/auth")(app);

    // Setup routes
    require("./routes/routes")(app);
};

module.exports = bootstrapConfig;