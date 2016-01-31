"use strict";

var jwt = require("jsonwebtoken");
var moment = require("moment");

var UsersHelper = require(ClassE.config.rootPath + "/helpers/usersHelper");

class AuthHelper {

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
        return jwt.sign(user, ClassE.config.jwt.secret, options || {});
    }

    static initJWTokenMiddleware(req, res, next)
    {
        // check cookies or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.cookies["classe.presence"];

        if (!token)
            return next();

        // Verifies secret and checks expiry
        jwt.verify(token, ClassE.config.jwt.secret, function (err, decoded)
        {
            if (err)
                return res.sendStatus(403);

            // Let's refresh the token if it has expired
            AuthHelper.refreshTokenIfExpired(decoded)
                .then(function (response)
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

    static async refreshTokenIfExpired(decoded)
    {
        var issuedAt = decoded.iat;
        var now = moment().unix().valueOf();

        var expiryDuration = ClassE.config.jwt.expiryInMinutes * 60;

        // If not expired just return the previous decoded token
        if ((now - issuedAt) <= expiryDuration)
            return {decoded: decoded};

        // Otherwise, let's recheck the database and make sure User claims the correct stuff
        var dbUser = await UsersHelper.getUser(decoded.id);

        // If user does not exist anmymore, invalidate the session user
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

    static setAuthCookie(token, res)
    {
        return res.cookie(ClassE.config.jwt.cookie.name, token, ClassE.config.jwt.cookie.options);
    }

    static clearAuthCookie(res)
    {
        return res.clearCookie(ClassE.config.jwt.cookie.name);
    }
}

module.exports = AuthHelper;