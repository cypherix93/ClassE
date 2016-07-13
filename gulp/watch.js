"use strict";

var runSequence = require("run-sequence");

module.exports = function (gulp, plugins, paths)
{
    // Watch server files for changes
    gulp.task("watch-server",
        function ()
        {
            plugins.watch(paths.server + "**",
                function ()
                {
                    runSequence(
                        "compile-server"
                    );
                });
        });

    // Watch client files for changes
    gulp.task("watch-client",
        function ()
        {
            var filesToWatch = [
                paths.client + "assets/**",
                paths.client + "views/**",
                paths.client + "index.html"
            ];

            plugins.watch(filesToWatch,
                function ()
                {
                    runSequence(
                        "copy-client-files"
                    );
                });
        });

    gulp.task("watch-angular",
        function ()
        {
            plugins.watch(paths.angular + "**/*",
                function ()
                {
                    runSequence(
                        "bundle-ng-files",
                        "copy-client-files"
                    );
                });
        });

    gulp.task("watch-sass",
        function ()
        {
            plugins.watch(paths.sass + "**/*.scss",
                function ()
                {
                    runSequence(
                        "preprocess-sass",
                        "copy-client-files"
                    );
                });
        });
};