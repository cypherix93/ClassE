var express = require("express");

var authHelper = require(ClassE.config.rootPath + "/data/auth");

var authRouter = express.Router();

authRouter.route("/register")
    .post(function(req, res)
    {
        var user = req.body;

        authHelper.isValidNewUser(user)
            .then(function(response)
            {
                if(response)
                {
                    res.json({ success: true });
                }
                else
                {
                    res.json({ success: false });
                }
            });
    });

module.exports = authRouter;