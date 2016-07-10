"use strict";

var runSequence = require("run-sequence");

module.exports = function (gulp, plugins, paths)
{
    // Build App
    gulp.task("build", function (callback)
    {
        runSequence(
            "clean",
            "compile",
            callback
        );
    });
};