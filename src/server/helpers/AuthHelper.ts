import jwt = require("jsonwebtoken");
import moment = require("moment");

import {Config} from "../config/Config";
import {DbContext} from "../database/DbContext";

export class AuthHelper
{
    // Helper that sets a user to session
    public static getUserForSession(user)
    {
        return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            roles: user.roles
        };
    }

    public static generateJWToken(user, options?)
    {
        return jwt.sign(user, Config.current.jwt.secret, options || {});
    }

    public static initJWTokenMiddleware(req, res, next)
    {
        // check cookies or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.cookies["classe.presence"];

        if (!token)
            return next();

        // Verifies secret and checks expiry
        jwt.verify(token, Config.current.jwt.secret, function (err, decoded)
        {
            if (err)
                return res.sendStatus(403);

            // Let's refresh the token if it has expired
            AuthHelper.refreshTokenIfExpired(decoded)
                .then((response) =>
                {
                    // If new token was provided, update cookie
                    if (response.token)
                    {
                        AuthHelper.setAuthCookie(response.token, res);
                    }

                    // If user was removed, clear cookie
                    if (!response.decoded)
                    {
                        AuthHelper.clearAuthCookie(res);
                    }

                    // Save to req.user whatever is the new decoded, refreshed or not
                    req.user = response.decoded;

                    // Carry on
                    return next();
                })
                .catch(function (err)
                {
                    return next(err);
                });
        });
    }

    private static async refreshTokenIfExpired(decoded)
    {
        var issuedAt = decoded.iat;
        var now = moment().unix().valueOf();

        var expiryDuration = Config.current.jwt.expiryInMinutes * 60;

        // If not expired just return the previous decoded token
        if ((now - issuedAt) <= expiryDuration)
            return {decoded: decoded};

        // Otherwise, let's recheck the database and make sure User claims the correct stuff
        var dbUser = await DbContext.repositories.User.getById(decoded.id);

        // If user does not exist anymore, invalidate the session user
        if (!dbUser)
            return {decoded: null};

        // Update the session user with stuff from the DB
        decoded = AuthHelper.getUserForSession(dbUser);

        // Set the issued at time to NOW
        decoded.iat = now;

        // Generate new token
        return {
            decoded: decoded,
            token: AuthHelper.generateJWToken(decoded)
        }
    }

    public static setAuthCookie(token, res)
    {
        var cookieConfig = Config.current.jwt.cookie;

        return res.cookie(cookieConfig.name, token, cookieConfig.options);
    }

    public static clearAuthCookie(res)
    {
        return res.clearCookie(Config.current.jwt.cookie.name);
    }
}