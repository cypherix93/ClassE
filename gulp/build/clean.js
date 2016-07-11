"use strict";

var del = require("del");

module.exports = function (gulp, plugins, paths)
{
    // Clean Directories
    gulp.task("clean", ["clean-server", "clean-client"], function (callback)
    {
        return del(paths.deploy + "**", {force: true}, callback);
    });

    gulp.task("clean-server", function (callback)
    {
        return del(paths.build + "server/**", {force: true}, callback);
    });
    
    gulp.task("clean-client", function (callback)
    {
        return del(paths.build + "client/**", {force: true}, callback);
    });
};