var localStrategy = require("passport-local").Strategy;

var AuthHelper = require(ClassE.config.rootPath + "/helpers/auth");

var passportLocalConfig = function (passport)
{
    passport.use(new localStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async function (identifier, password, next)
        {
            // Let's check if the user input was valid
            var doLogin = await AuthHelper.doLogin(identifier, password);
            if (doLogin.error)
            {
                next(null, null, {message: doLogin.error});
            }

            // Login the user and give them a session
            next(null, doLogin.data);
        }));
};

module.exports = passportLocalConfig;