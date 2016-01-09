var express = require("express");

var account = express.Router();

account.get("/", function(req, res)
{
    res.send("Hello there from Index!");
});

account.get("/login", function(req, res)
{
    res.send("Hello there from Login!");
});

module.exports = account;