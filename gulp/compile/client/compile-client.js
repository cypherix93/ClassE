"use strict";

var typescript = require("typescript");
var runSequence = require("run-sequence");

module.exports = function (gulp, plugins, paths)
{
    // Compile Client files
    gulp.task("compile-client", function (callback)
    {
        runSequence(
            ["bundle-ng-files", "preprocess-sass"],
            "copy-client-files",
            callback
        );
    });

    // Compile Client files
    gulp.task("copy-client-files", function ()
    {
        var filesToCopy = [
            paths.client + "assets/**",
            paths.client + "views/**",
            paths.client + "index.html"
        ];

        return gulp.src(filesToCopy, {base: paths.client})
            .pipe(plugins.debug({title: "[client] copied:"}))
            .pipe(gulp.dest(paths.build + "client/"));
    });
};