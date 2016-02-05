"use strict";

var routesConfig = function (app)
{
    console.log("=> Setting up Routes...");

    // Dynamically setup controller routes
    require("./controllers")(app);

    require("./errors")(app);
};

module.exports = routesConfig;