"use strict";

class RoutesHelper
{
    // Use this to make routes require authorization
    static authorize(roles)
    {
        return function(req, res, next)
        {
            // User hasn't logged in, so send 401
            if (!req.user)
                return res.sendStatus(401);

            // If roles weren't provided, it means we are only checking for authenticated users
            // Then accept
            if(!roles)
                return next();

            // Roles were requested, User has logged in, let's check roles
            var userRoles = req.user.roles;

            // None of user's roles match the roles requested, send 403
            if (_.intersection(roles, userRoles).length === 0)
                return res.sendStatus(403);

            // Otherwise accept
            return next();
        };
    };
}

module.exports = RoutesHelper;