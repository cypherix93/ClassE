"use strict";

import email = require("emailjs");

import {Express} from "express";

var MailHelper = require(ClassE.config.rootPath + "/helpers/MailHelper");

export class ErrorsConfig
{
    public static init(app:Express)
    {
        // Handle all application errors
        app.use(function (err, req, res, next)
        {
            ErrorsConfig.sendErrorMail(err, req);

            return res.status(500).send(err.message);
        });
    }

    private static sendErrorMail(err, req)
    {
        var server = email.server.connect({
            host: "127.0.0.1",
            port: 25
        });

        var message:any = {
            from: "ClassE ErrorBot <errors@classe.com>",
            to: "ClassE ErrorBot <errors@classe.com>"
        };

        var errorHtml = MailHelper.buildErrorMailMessage(err, req);

        message.subject = `${err.name}: ${err.message}`;
        message.attachment = [
            {data: errorHtml, alternative: true}
        ];

        server.send(message);
    }
}