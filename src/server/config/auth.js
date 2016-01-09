var cookieParser = require("cookie-parser");
var session = require("express-session");

var auth = function (app)
{
    //Hook up the auth related middlewares
    app.use(cookieParser());
    app.use(session({
        secret: "asdfghjkl",
        resave: false,
        saveUninitialized: false
    }));

    // Setup Passport
    require("./passport/passport")(app);
};

module.exports = auth;