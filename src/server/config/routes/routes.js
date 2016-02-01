"use strict";

var routesConfig = function (app)
{
    console.log("=> Setting up Routes...");

    // Dynamically setup controller routes
    require("./controllers")(app);

    // Handle all application errors
    app.use(function (err, req, res, next)
    {
        //TODO: Send err.stack to elmah

        return res.status(err.status || 500).send(err.message);
    });
};

module.exports = routesConfig;