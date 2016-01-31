"use strict";

var jwt = require("jsonwebtoken");

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

    static verifyJWToken(token, callback)
    {
        jwt.verify(token, ClassE.config.jwt.secret, callback);
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