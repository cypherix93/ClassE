"use strict";

var winston = require("winston");
var winstonMail = require("winston-mail").Mail;

var errorsConfig = function (app)
{
    winston
        .remove(winston.transports.Console)
        .add(winston.transports.Mail,
        {
            to: "errors@classe.com",
            from: "errors@classe.com",
            host: "127.0.0.1",
            port: 25,
            subject: "{{level}}: {{msg}}"
        });

    // Handle all application errors
    app.use(function (err, req, res, next)
    {
        winston.error(err.stack);

        return res.status(err.status || 500).send(err.message);
    });
};

module.exports = errorsConfig;