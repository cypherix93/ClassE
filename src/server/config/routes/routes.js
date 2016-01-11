"use strict";

var routes = function (app)
{
    console.log("=> Setting up Routes...");

    // Handle async errors
    app.use(function (req, res, next)
    {
        process.on("unhandledRejection", function (err)
        {
            next(err);
        });

        next();
    });

    // Dynamically setup controller routes
    require("./controllers")(app);

    // Handle all other application errors
    app.use(function (err, req, res, next)
    {
        //TODO: Send err.stack to elmah

        return res.status(err.status || 500).send(err.message);
    });
};

module.exports = routes;