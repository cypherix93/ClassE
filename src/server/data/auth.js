"use strict";

var validator = require("validator");

var User = ClassE.models.User;
var Passport = ClassE.models.Passport;

class AuthHelper {
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
            .count({email: input.email})
            .execute();

        if (userCount > 0)
            return {error: "A user with the same email already exists."};

        // All checks passed
        return {success: true};
    };

    static async validateLogin(input)
    {
        // Check for empty email and password
        if (!input.email || !input.password)
            return {error: "Email and Password must be specified."};

        // Check if user exists
        var dbUser = await User
            .filter({email: input.email})
            .run();

        dbUser = dbUser[0];

        if (!dbUser)
            return {error: "Email or Password is not valid."};

        // Now check password if it matches the user's associated Passport
        var dbPassport = await Passport
            .filter({userId: dbUser.id, protocol: "local"})
            .run();

        dbPassport = dbPassport[0];

        if (!dbPassport)
            return {error: "Password has not been set for this account."};

        var passwordValid = dbPassport.validatePassword(input.password);

        if (!passwordValid)
            return {error: "Email or Password is not valid."};

        // All checks passed
        return {success: true};
    };
}

module.exports = AuthHelper;