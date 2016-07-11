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
    gulp.task("watch-client", ["watch-public", "watch-angular", "watch-sass"]);

    gulp.task("watch-public",
        function ()
        {
            plugins.watch(paths.client + "**",
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