var cookieParser = require("cookie-parser");
var session = require("express-session");

var authConfig = function (app)
{
    console.log("=> Setting up Auth...");

    //Hook up the auth related middlewares
    app.use(cookieParser());
    app.use(session({
        secret: "asdfghjkl",
        resave: false,
        saveUninitialized: false
    }));

    // Setup Passport
    require("./passport")(app);
};

module.exports = authConfig;