var localStrategy = require("passport-local").Strategy;

var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");

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
            var loginResult = await AuthHelper.doLogin(identifier, password);
            if (loginResult.error)
            {
                next(null, null, {message: loginResult.error});
            }

            // At this point, we are authenticated, so lets generate a JWT for the user
            loginResult.data.token = AuthHelper.generateJWToken(loginResult.data);

            // Login the user and give them a session
            next(null, loginResult.data);
        }));
};

module.exports = passportLocalConfig;