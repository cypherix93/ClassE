"use strict";

var email = require("emailjs");

var MailHelper = require(ClassE.config.rootPath + "/helpers/MailHelper");

var errorsConfig = function (app)
{
    var server = email.server.connect({
        host: "127.0.0.1",
        port: 25
    });

    var message = {
        from: "ClassE ErrorBot <errors@classe.com>",
        to: "ClassE ErrorBot <errors@classe.com>"
    };

    // Handle all application errors
    app.use(function (err, req, res, next)
    {
        var errorHtml = MailHelper.buildErrorMailMessage(err, req);

        message.subject = `${err.name}: ${err.message}`;
        message.attachment = [
            {data: errorHtml, alternative: true}
        ];

        server.send(message);

        return res.status(500).send(err.message);
    });
};

module.exports = errorsConfig;