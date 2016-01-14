"use strict";

var validator = require("validator");

var User = ClassE.models.User;
var Passport = ClassE.models.Passport;

class AuthHelper {

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
    };

    // Login helper
    static async doLogin(email, password)
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
            data: {
                id: dbUser.id,
                identity: dbUser.email,
                name: dbUser.fullName,
                roles: dbUser.roles
            }
        };
    };

    // Use this to make routes require authorization
    static authorize(roles)
    {
        return function(req, res, next)
        {
            // User hasn't logged in, so send 401
            if (!req.user)
                return res.status(401).end();

            // If roles weren't provided, it means we are only checking for authenticated users
            // Then accept
            if(!roles)
                return next();

            // Roles were requested, User has logged in, let's check roles
            var userRoles = req.user.roles;

            // None of user's roles match the roles requested, send 403
            if (_.intersection(roles, userRoles).length === 0)
                return res.status(403).end();

            // Otherwise accept
            return next();
        };
    };
}

module.exports = AuthHelper;