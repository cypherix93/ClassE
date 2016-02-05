var localStrategy = require("passport-local").Strategy;

var DbContext = require(ClassE.config.rootPath + "/database/DbContext");
var AuthHelper = require(ClassE.config.rootPath + "/helpers/AuthHelper");

var User = DbContext.getRepository("User").get();
var Passport = DbContext.getRepository("Passport").get();

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
            var loginResult = await processLogin(identifier, password);
            if (loginResult.error)
            {
                next(null, null, {message: loginResult.error});
            }

            // At this point, we are authenticated, so lets generate a JWT for the user
            var token = AuthHelper.generateJWToken(loginResult.data);

            var user = {
                user: loginResult.data,
                token: token
            }

            // Login the user and give them a session
            next(null, user);
        }));

    // Login helper
    var processLogin = async function (email, password)
    {
        // Check for empty email and password
        if (!email || !password)
            return {error: "Email and Password must be specified."};

        // Check if user exists
        var dbUser = await User
            .filter({email: email})
            .nth(0)
            .run();

        if (!dbUser)
            return {error: "Email or Password is not valid."};

        // Now check password if it matches the user's associated Passport
        var dbPassport = await Passport
            .filter({userId: dbUser.id, protocol: "local"})
            .nth(0)
            .run();

        if (!dbPassport)
            return {error: "Password has not been set for this account."};

        var passwordValid = dbPassport.validatePassword(password);

        if (!passwordValid)
            return {error: "Email or Password is not valid."};

        // All checks passed
        return {
            data: AuthHelper.getUserForSession(dbUser)
        };
    };
};

module.exports = passportLocalConfig;