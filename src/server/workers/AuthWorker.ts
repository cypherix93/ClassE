import validator = require("validator");
import passport = require("passport");

import {DbContext} from "../database/DbContext";
import {AuthHelper} from "../helpers/AuthHelper";

export class AuthWorker
{
    public static doLogin(req, res, next)
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

    public static async doRegister(req, res, next)
    {
        var def = Q.defer();

        var input = req.body;

        var userModel = DbContext.repositories.User.get();
        var passportModel = DbContext.repositories.Passport.get();

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
        var newUser = new userModel()
        ({
            email: input.email
        });

        newUser = await newUser.save();

        // Make new passport for the new user
        var userPassport = new passportModel()
        ({
            protocol: "local",
            password: passportModel.hashPassword(input.password),
            accessToken: passportModel.generateAccessToken(),
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
    public static async validateNewUser(input)
    {
        var userModel = DbContext.repositories.User.get();
        var passportModel = DbContext.repositories.Passport.get();

        // Check for empty email and password
        if (!input.email || !input.password)
            return {error: "Email and Password must be specified."};

        // Validate email address
        if (!validator.isEmail(input.email))
            return {error: "Entered email is not a valid email address."};

        // Validate password constraints
        var passwordMinLength = passportModel.getPasswordMinLength();

        if (input.password.length < passwordMinLength)
            return {error: "Password must be at least " + passwordMinLength + " characters long."};

        // Check if user already exists
        var userCount = await userModel
            .filter({email: input.email})
            .count()
            .execute();

        if (userCount > 0)
            return {error: "A user with the same email already exists."};

        // All checks passed
        return {};
    }
}