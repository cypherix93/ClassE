var express = require("express");

var accountRouter = express.Router();

accountRouter.route("/")
    .get(function (req, res)
    {
        res.send("Hello there from Index!");
    });

accountRouter.route("/login")
    .get(function (req, res)
    {
        res.send("Hello there from Login!");
    });

module.exports = accountRouter;