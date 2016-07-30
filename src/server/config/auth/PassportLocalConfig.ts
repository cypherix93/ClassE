import {Passport} from "passport";
import {Strategy} from "passport-local";

import {DbContext} from "../../database/DbContext"
import {AuthHelper} from "../../helpers/AuthHelper";
import {UserRepository} from "../../database/repositories/UserRepository";
import {Repository} from "../../database/Repository";

export class PassportLocalConfig
{
    public static init(passport:Passport)
    {
        passport.use(new Strategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            async (identifier, password, next) =>
            {
                // Let's check if the user input was valid
                var loginResult = await PassportLocalConfig.processLogin(identifier, password);
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
    }

    // Login helper
    private static async processLogin(email, password)
    {
        // Check for empty email and password
        if (!email || !password)
            return {error: "Email and Password must be specified."};

        var userRepo = DbContext.repositories.User as UserRepository;
        var passportRepo = DbContext.repositories.Passport as Repository;

        // Check if user exists
        var dbUser = await userRepo.getByEmail(email);

        if (!dbUser)
            return {error: "Email or Password is not valid."};

        // Now check password if it matches the user's associated Passport
        var dbPassport = await passportRepo.getModel()
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
}