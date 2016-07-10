"use strict";

var del = require("del");

module.exports = function (gulp, plugins, paths)
{
    // Clean Directories
    gulp.task("clean", function (callback)
    {
        return del([
                paths.build + "**",
                paths.deploy + "**"
            ],
            {force: true}, callback);
    });
};