"use strict";

var bower = require("bower");

module.exports = function (gulp, plugins, paths)
{
    // Restore NPM and Bower packages
    gulp.task("bower-restore", function (callback)
    {
        bower.commands.install([], {save: true}, {})
            .on("end", function (installed)
            {
                callback(); // notify gulp that this task is finished
            });
    });
};