"use strict";

var validator = require("validator");
var passport = require("passport");

var DbContext = require(ClassE.config.rootPath + "/database/DbContext");
var AuthHelper = require(ClassE.config.rootPath + "/helpers/AuthHelper");

var User = DbContext.getRepository("User").get();
var Passport = DbContext.getRepository("Passport").get();

class AuthWorker {

    static doLogin(req, res, next)
    {
        var def = Q.defer();

        // Do authentication against passport
        passport.authenticate("local", function (err, user, info)
        {
            // If internal error occured
            if (err)
                return next(err);

            // If authentication error occured
            if (!user)
            {
                def.resolve({
                    success: false,
                    message: info.message
                });
            }

            // Set user to session
            req.login(user, function (err)
            {
                if (err)
                    return next(err);

                AuthHelper.setAuthCookie(user.token, res);

                def.resolve({
                    success: true,
                    data: user.user
                });
            });
        })(req, res, next);

        return def.promise;
    }

    static async doRegister(req, res, next)
    {
        var def = Q.defer();

        var input = req.body;

        // Let's check if the user input was valid
        var validateUser = await AuthWorker.validateNewUser(input);
        if (validateUser.error)
        {
            return {
                success: false,
                error: validateUser.error
            };
        }

        // User input was valid, so let's create an account for them
        var newUser = new User({
            email: input.email
        });

        newUser = await newUser.save();

        // Make new passport for the new user
        var userPassport = new Passport({
            protocol: "local",
            password: Passport.hashPassword(input.password),
            accessToken: Passport.generateAccessToken(),
            userId: newUser.id
        });

        await userPassport.save();

        // Auto login and set user to session
        var sessionUser = AuthHelper.getUserForSession(newUser);
        req.login(sessionUser, function (err)
        {
            if (err)
                return next(err);

            return def.resolve({success: true, data: req.user});
        });

        return await def.promise;
    }

    // New User validation on Register
    static async validateNewUser(input)
    {
        // Check for empty email and password
        if (!input.email || !input.password)
            return {error: "Email and Password must be specified."};

        // Validate email address
        if (!validator.isEmail(input.email))
            return {error: "Entered email is not a valid email address."};

        // Validate password constraints
        var passwordMinLength = Passport.getPasswordMinLength();

        if (input.password.length < passwordMinLength)
            return {error: "Password must be at least " + passwordMinLength + " characters long."};

        // Check if user already exists
        var userCount = await User
            .filter({email: input.email})
            .count()
            .execute();

        if (userCount > 0)
            return {error: "A user with the same email already exists."};

        // All checks passed
        return {};
    }
}

module.exports = AuthWorker;