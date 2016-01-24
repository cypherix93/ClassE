var RoutesHelper = require(ClassE.config.rootPath + "/helpers/routesHelper");
var UsersHelper = require(ClassE.config.rootPath + "/helpers/usersHelper");

// Endpoint "/account"
var accountRouter = function (router)
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
            var user = await UsersHelper.getUser(userId, isCurrentUser);

            if (!user)
                return res.status(404).end();

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
                return res.status(403).end();

            // User checked out, let's update the user's data
            var updateUser = await UsersHelper.updateUser(userId, req.body);
            if(updateUser.error)
            {
                return res.json({
                    success: false,
                    error: updateUser.error
                });
            }

            return res.json({success: true})
        })
    ;
};

module.exports = accountRouter;