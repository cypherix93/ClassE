"use strict";

var validator = require("validator");

var models = ClassE.models;
var User = models.User;
var Passport = models.Passport;

class AuthHelper
{
    static async validateNewUser(user)
    {
        // Check for empty email and password
        if (!user.email || !user.password)
            return {error: "Email and Password must be specified."};

        // Validate email address
        if (!validator.isEmail(user.email))
            return {error: "Entered email is not a valid email address."};

        // Validate password constraints
        var passwordMinLength = Passport.getPasswordMinLength();

        if (user.password.length < passwordMinLength)
            return {error: "Password must be at least " + passwordMinLength + " characters long."};

        // Check if user already exists
        var userExists = (await User.count(x => x("email").eq(user.email)).execute()) > 0;

        if (userExists)
            return {error: "A user with the same email already exists."};

        // All checks passed
        return {success: true};
    };

}

module.exports = AuthHelper;