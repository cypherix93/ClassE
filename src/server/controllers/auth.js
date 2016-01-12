var express = require("express");

var AuthHelper = require(ClassE.config.rootPath + "/data/auth");

var User = ClassE.models.User;
var Passport = ClassE.models.Passport;

var authRouter = express.Router();

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
            username: input.username,
            email: input.email
        });

        newUser = await newUser.save();

        // Make new passport for the new user
        var userPassport = new Passport({
            protocol: "local",
            password: require("bcryptjs").hashSync(input.password, 10),
            accessToken: require("crypto").randomBytes(48).toString("base64"),
            userId: newUser.id
        });

        await userPassport.save();

        return res.json({success: true});
    });

module.exports = authRouter;