var passport = require("passport");

var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");
var RoutesHelper = require(ClassE.config.rootPath + "/helpers/routesHelper");

var User = ClassE.models.User;
var Passport = ClassE.models.Passport;

// Endpoint "/auth"
var authRouter = function (router)
{
    // Register endpoint
    router.route("/register")
        .post(async function (req, res, next)
        {
            var registerData = await AuthHelper.doRegister(req, res, next);

            return res.json(registerData);
        })

    // Login endpoint
    router.route("/login")
        .post(async function (req, res, next)
        {
            if (req.user)
                return res.json({
                    success: true,
                    data: req.user
                });

            var loginResult = await AuthHelper.doLogin(req, res, next);

            return res.json(loginResult);
        })

    // Login endpoint
    router.route("/logout")
        .all(RoutesHelper.authorize())
        .post(function (req, res, next)
        {
            req.logout();

            AuthHelper.clearAuthCookie(res);

            return res.json({
                success: true
            });
        })

    // Get the current user in session
    router.route("/getSessionUser")
        .get(function (req, res, next)
        {
            return res.json({
                success: true,
                data: req.user
            });
        })
};

module.exports = authRouter;