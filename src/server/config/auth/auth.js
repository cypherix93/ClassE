var cookieParser = require("cookie-parser");

var authConfig = function (app)
{
    console.log("=> Setting up Auth...");

    //Hook up the auth related middlewares
    app.use(cookieParser());

    // Setup Passport
    require("./passport")(app);
};

module.exports = authConfig;