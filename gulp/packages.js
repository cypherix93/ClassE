"use strict";

module.exports = function (gulp, plugins, paths, meta)
{
    require("./packages/update-package-info")(gulp, plugins, paths, meta);
    require("./packages/bower-restore")(gulp, plugins, paths, meta);
    require("./packages/bower-install")(gulp, plugins, paths, meta);
};