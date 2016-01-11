var express = require("express");

var authHelper = require(ClassE.config.rootPath + "/data/auth");

var authRouter = express.Router();

authRouter.route("/register")
    .post(async function (req, res)
    {
        var user = req.body;

        var validateUser = await authHelper.validateNewUser(user);

        if (validateUser.error)
        {
            res.json({
                success: false,
                error: validateUser.error
            });
            return;
        }

        res.json({success: true});
    });

module.exports = authRouter;