var express = require("express");
var passport = require("passport");

var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");

var User = ClassE.models.User;
var Passport = ClassE.models.Passport;

var authRouter = express.Router();

authRouter.route("/isAuthenticated")
    .get(function (req, res, next)
    {
        if (req.user)
            return res.json({success: true});

        return res.json({success: false});
    });

authRouter.route("/register")
    .post(async function (req, res, next)
    {
        var input = req.body;

        // Let's check if the user input was valid
        var validateUser = await AuthHelper.validateNewUser(input);
        if (validateUser.error)
        {
            return res.json({
                success: false,
                error: validateUser.error
            });
        }

        // User input was valid, so let's create an account for them
        var newUser = new User({
            email: input.email
        });

        newUser = await newUser.save();

        // Make new passport for the new user
        var userPassport = new Passport({
            protocol: "local",
            password: Passport.hashPassword(input.password),
            accessToken: Passport.generateAccessToken(),
            userId: newUser.id
        });

        await userPassport.save();

        return res.json({success: true});
    });

authRouter.route("/login")
    .post(function (req, res, next)
    {
        if (req.user)
            return res.json({success: true, user: req.user});

        // Do authentication against passport
        passport.authenticate("local", function (err, user, info)
        {
            // If internal error occured
            if (err)
                return next(err);

            // If authentication error occured
            if (!user)
            {
                return res.json({
                    success: false,
                    error: info.message
                });
            }

            // Set user to session
            req.login(user, function (err)
            {
                if (err)
                    return next(err);

                return res.json({success: true, user: req.user});
            });
        })(req, res, next);
    });

module.exports = authRouter;