"use strict";

module.exports = function (gulp, plugins, paths)
{
    // Compile SASS files
    gulp.task("preprocess-sass", function ()
    {
        var cssDir = paths.client + "css/";

        return gulp.src(paths.sass + "main.scss")
            .pipe(plugins.debug({title: "compiling sass:"}))
            .pipe(plugins.plumber())
            .pipe(plugins.sassGlob())
            .pipe(plugins.sass())
            .pipe(plugins.plumber.stop())
            .pipe(gulp.dest(cssDir))

            .pipe(plugins.cleanCss())
            .pipe(plugins.rename({suffix: ".min"}))
            .pipe(gulp.dest(cssDir));
    });
};