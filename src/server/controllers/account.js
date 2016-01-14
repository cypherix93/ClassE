var express = require("express");
var AuthHelper = require(ClassE.config.rootPath + "/helpers/auth");

var User = ClassE.models.User;

var accountRouter = express.Router();

accountRouter.route("/:userId")
    .all(AuthHelper.authorize)
    .get(async function (req, res, next)
    {
        var userId = req.params.userId;

        // Check if the user requested is the current user
        var isCurrentUser = userId === req.user.id;

        // Get the requested user from the db
        var user = await User.get(userId).run();

        return res.json(user);
    });

module.exports = accountRouter;