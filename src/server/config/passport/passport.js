var passport = require("passport");

var passportConfig = function(app)
{
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, callback)
    {
        callback(null, user);
    });
    passport.deserializeUser(function(user, callback)
    {
        callback(null, user);
    });

    // Setup strategies for Passport
    require("./passport-local")(passport);
};

module.exports = passportConfig;