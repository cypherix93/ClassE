var express = require("express");
var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");
var UsersHelper = require(ClassE.config.rootPath + "/helpers/usersHelper");

var User = ClassE.models.User;

var accountRouter = express.Router();

// Force authorization across controller
accountRouter.use(AuthHelper.authorize());

// Access by ID endpoints
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

    .patch(async function (req, res, next)
    {
        var userId = req.params.userId;

        // If the user requested is not the current user, send 401
        if (userId !== req.user.id)
            return res.status(403).end();

        // User checked out, let's get the data
        var data = req.body;

        var dbUser = await UsersHelper.getUser(userId, true);

        // Update changes that the user wants to make
        dbUser.preferences = data.preferences;

        await dbUser.save();

        return res.json({ success: true })
    })
;

module.exports = accountRouter;