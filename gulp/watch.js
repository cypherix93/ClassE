"use strict";

module.exports = function (gulp, plugins, paths)
{
    // Watch server files for changes
    gulp.task("watch-server",
        function ()
        {
            return plugins.watch(paths.server + "**",
                plugins.batch(function (events, done)
                {
                    gulp.start("compile-server", done);
                }));
        });

    // Watch client files for changes
    gulp.task("watch-client", ["watch-angular", "watch-sass"],
        function ()
        {
            return plugins.watch(paths.client + "**",
                plugins.batch(function (events, done)
                {
                    gulp.start("copy-client-files", done);
                }));
        });

    gulp.task("watch-angular",
        function ()
        {
            return plugins.watch([paths.angular + "**/*.js", paths.angular + "templates/**/*.html"],
                plugins.batch(function (events, done)
                {
                    gulp.start("bundle-ng-files", done);
                }));
        });

    gulp.task("watch-sass",
        function ()
        {
            return plugins.watch(paths.sass + "**/*.scss",
                plugins.batch(function (events, done)
                {
                    gulp.start("preprocess-sass", done);
                }));
        });
};