var express = require("express");

var accountRouter = express.Router();

accountRouter.route("/")
    .get(function (req, res)
    {
        if(!req.user)
            res.send("Not authenticated brah.");

        res.json(req.user);
    });

accountRouter.route("/login")
    .get(function (req, res)
    {
        res.send("Hello there from Login!");
    });

module.exports = accountRouter;