"use strict";

var validator = require("validator");
var jwt = require("jsonwebtoken");

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
    }

    // Helper that sets a user to session
    static getUserForSession(user)
    {
        return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            roles: user.roles
        };
    }

    static generateJWToken(user, options)
    {
        return jwt.sign(user, ClassE.config.secret, options || {});
    }

    static verifyJWToken(token, callback)
    {
        // Verifies secret and checks expiry
        jwt.verify(token, ClassE.config.secret, callback);
    }

    static setAuthCookie(token, res)
    {
        return res.cookie(ClassE.config.cookie.name, token, ClassE.config.cookie.options);
    }

    static clearAuthCookie(res)
    {
        return res.clearCookie(ClassE.config.cookie.name);
    }
}

module.exports = AuthHelper;