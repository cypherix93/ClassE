var express = require("express");

var authRouter = express.Router();

authRouter.route("/register")
    .post(function(req, res)
    {

    });

module.exports = authRouter;