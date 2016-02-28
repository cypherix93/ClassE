import validator = require("validator");
import passport = require("passport");

import {DbContext} from "../database/DbContext";
import {AuthHelper} from "../helpers/AuthHelper";
import {Q} from "../helpers/Globals";
import {UserRepository} from "../database/repositories/UserRepository";
import {Repository} from "../database/Repository";

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

        var userRepo = DbContext.repositories.User as UserRepository;
        var passportRepo = DbContext.repositories.Passport as Repository;

        // Let's check if the user input was valid
        var validateUser = await AuthWorker.validateNewUser(input);
        if (validateUser.error)
        {
            return {
                success: false,
                message: validateUser.error
            };
        }

        // User input was valid, so let's create an account for them
        var newUser = userRepo.create({
            email: input.email
        });

        newUser = await newUser.save();

        // Make new passport for the new user
        var userPassport = passportRepo.create({
            protocol: "local",
            password: passportRepo.getModel().hashPassword(input.password),
            accessToken: passportRepo.getModel().generateAccessToken(),
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
        var userRepo = DbContext.repositories.User as UserRepository;
        var passportRepo = DbContext.repositories.Passport as Repository;

        // Check for empty email and password
        if (!input.email || !input.password)
            return {error: "Email and Password must be specified."};

        // Validate email address
        if (!validator.isEmail(input.email))
            return {error: "Entered email is not a valid email address."};

        // Validate password constraints
        var passwordMinLength = passportRepo.getModel().getPasswordMinLength();

        if (input.password.length < passwordMinLength)
            return {error: "Password must be at least " + passwordMinLength + " characters long."};

        // Check if user already exists
        var user = await userRepo.getByEmail(input.email);

        if (user)
            return {error: "A user with the same email already exists."};

        // All checks passed
        return {};
    }
}