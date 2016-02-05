"use strict";

var fs = require("fs");

const errorMailStyle = fs.readFileSync(ClassE.config.rootPath + "/content/errorMail.css");

class MailHelper {

    static buildErrorMailMessage(err, req)
    {
        var writeTableRow = function (th, td)
        {
            return `<tr><th>${th}</th><td>${td}</td></tr>`;
        }
        var writeRequestHeaderRows = function ()
        {
            return writeTableRow("Request URL", req.url) +
                writeTableRow("Request Method", req.method) +
                writeTableRow("Version", req.httpVersion) +
                writeTableRow("User ID", req.user.id) +
                writeTableRow("User Email", req.user.email) +
                writeTableRow("User Roles", req.user.roles);
        }
        var writeHttpHeaderRows = function ()
        {
            var rows = "";

            for (let header in req.headers)
            {
                if (!req.headers.hasOwnProperty(header))
                    continue;

                if (header === "cookie")
                    continue;

                rows += writeTableRow(header, req.headers[header]);
            }

            return rows;
        };

        var html = `
        <html>
        <head>
            <style>${errorMailStyle}</style>
        </head>
        <body>
            <div id="container">
                <div id="error">
                    <h3 id="error_message">${err.name}: ${err.message}</h3>
                    <div id="error_stack">${err.stack.replace(/\n/g, "<br/>").replace(/    /g, "&nbsp; &nbsp; &nbsp; &nbsp;")}</div>
                </div>
                <div id="request">
                    <h3>Request Metadata</h3>
                    <table>
                        ${writeRequestHeaderRows()}
                    </table>
                </div>
                <div id="headers">
                    <h3>HTTP Headers</h3>
                    <table>
                        ${writeHttpHeaderRows()}
                    </table>
                </div>
            </div>
        </body>
        </html>
        `;

        return html;
    }
}

module.exports = MailHelper;