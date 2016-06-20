"use strict";

module.exports = function (gulp, plugins, paths)
{
    // Compile everything
    gulp.task("compile", ["compile-server", "compile-client"]);

    // Server
    require("./compile/server/compile-server")(gulp, plugins, paths);
    
    // Client
    require("./compile/client/compile-client")(gulp, plugins, paths);
    require("./compile/client/bundle-ng-files")(gulp, plugins, paths);
    require("./compile/client/preprocess-sass")(gulp, plugins, paths);
};