"use strict";

module.exports = function (gulp, plugins, paths)
{
    // Watch server files for changes
    gulp.task("watch-server",
        function ()
        {
            plugins.watch(paths.server + "**",
                function ()
                {
                    gulp.start("compile-server");
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
                    gulp.start("copy-client-files");
                });
        });

    gulp.task("watch-angular",
        function ()
        {
            plugins.watch([paths.angular + "**/*.js", paths.angular + "templates/**/*.html"],
                function ()
                {
                    gulp.start("bundle-ng-files");
                });
        });

    gulp.task("watch-sass",
        function ()
        {
            plugins.watch(paths.sass + "**/*.scss",
                function ()
                {
                    gulp.start("preprocess-sass");
                });
        });
};