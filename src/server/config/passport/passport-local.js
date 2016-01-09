var localStrategy = require("passport-local").Strategy;

var passportLocalConfig = function(passport)
{
    passport.use(new localStrategy({
        usernameField: "username",
        passwordField: "password"
    },
    function(username, password, callback)
    {
        
    }));
};

module.exports = passportLocalConfig;