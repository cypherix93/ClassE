var express = require("express");

var AuthHelper = require(ClassE.config.rootPath + "/data/auth");

var authRouter = express.Router();

authRouter.route("/register")
    .post(async function (req, res)
    {
        var user = req.body;

        var validateUser = await AuthHelper.validateNewUser(user);

        if (validateUser.error)
        {
            return res.json({
                success: false,
                error: validateUser.error
            });
        }

        return res.json({success: true});
    });

module.exports = authRouter;