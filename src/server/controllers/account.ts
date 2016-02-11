import {Router} from "express";
import {DbContext} from "../database/DbContext";
import {RoutesHelper} from "../helpers/RoutesHelper";

// Endpoint "/account"
var accountRouter = function (router:Router)
{
    // Force authorization across controller
    router.use(RoutesHelper.authorize());

    // Access by ID endpoints
    router.route("/:userId")

        // Get a user by ID
        .get(async function (req, res, next)
        {
            var userId = req.params.userId;

            // Check if the user requested is the current user
            var isCurrentUser = userId === req.user.id;

            // Get the requested user from the db
            var user = await DbContext.repositories.User.getById(userId, isCurrentUser);

            if (!user)
                return res.sendStatus(404);

            return res.json({
                success: true,
                data: user
            });
        })

        // Update a user's info
        .patch(async function (req, res, next)
        {
            var userId = req.params.userId;

            // If the user requested is not the current user, send 401
            if (userId !== req.user.id)
                return res.sendStatus(403);

            // User checked out, let's update the user's data
            var updatedUser = await DbContext.repositories.User.update(userId, req.body);

            await updatedUser.save();

            return res.json({
                success: true,
                data: updatedUser
            })
        })
};

export = accountRouter;