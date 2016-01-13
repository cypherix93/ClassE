var express = require("express");

var AuthHelper = require(ClassE.config.rootPath + "/data/auth");

var accountRouter = express.Router();

accountRouter.route("/")
    .all(AuthHelper.authorize)
    .get(function (req, res, next)
    {
        return res.json(req.user);
    });

module.exports = accountRouter;