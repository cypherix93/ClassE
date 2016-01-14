var express = require("express");
var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");
var UsersHelper = require(ClassE.config.rootPath + "/helpers/usersHelper");

var User = ClassE.models.User;

var accountRouter = express.Router();

// Force authorization for every single endpoint on this controller
accountRouter.all("/*", AuthHelper.authorize);

// Get by ID endpoint
accountRouter.route("/:userId")

    .get(async function (req, res, next)
    {
        var userId = req.params.userId;

        // Check if the user requested is the current user
        var isCurrentUser = userId === req.user.id;

        // Get the requested user from the db
        var user = await UsersHelper.getUser(userId, isCurrentUser);

        if(!user)
            return res.status(404).end();

        return res.json(user);
    })
;

module.exports = accountRouter;