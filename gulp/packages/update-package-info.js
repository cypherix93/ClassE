"use strict";

var merge = require("merge-stream");

module.exports = function (gulp, plugins, paths, meta)
{
    // Update Assembly Info
    gulp.task("update-package-info", function ()
    {
        // Update bower.json Info
        var bowerJson = gulp.src("./bower.json")
            .pipe(plugins.debug({title: "bower.json:"}))
            .pipe(plugins.jsonEditor({
                name: meta.name,
                version: meta.version
            }))
            .pipe(gulp.dest("."));
        
        // Update package.json Info
        var packageJson = gulp.src("./package.json")
            .pipe(plugins.debug({title: "package.json:"}))
            .pipe(plugins.jsonEditor({
                name: meta.name,
                version: meta.version,
                description: meta.description,
                copyright: meta.copyright,
                authors: meta.authors
            }))
            .pipe(gulp.dest("."));
        
        // Update meta.json Info
        var metaJson = gulp.src(paths.client + "js/angular/meta.json")
            .pipe(plugins.debug({title: "meta.json:"}))
            .pipe(plugins.jsonEditor({
                name: meta.name,
                version: meta.version,
                description: meta.description,
                copyright: meta.copyright,
                authors: meta.authors
            }))
            .pipe(gulp.dest(paths.client + "js/angular/"));
        
        return merge(bowerJson, packageJson, metaJson);
    });
};