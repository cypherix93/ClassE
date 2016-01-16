"use strict";

var enrouten = require("express-enrouten");
var path = require("path");

var controllersConfig = function (app)
{
    // Use enrouten to include our controller files
    app.use(enrouten({
        directory: path.join(ClassE.config.rootPath, "controllers")
    }));
};

module.exports = controllersConfig;