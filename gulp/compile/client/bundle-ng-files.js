"use strict";

var streamqueue = require("streamqueue");

module.exports = function (gulp, plugins, paths)
{
    // Bundle AngularJS files
    gulp.task("bundle-ng-files", function ()
    {
        var angularScripts = [
            paths.angular + "AngularApp.js",
            paths.angular + "core/startup/**/*.js",
            paths.angular + "core/services/**/*.js",
            paths.angular + "core/filters/**/*.js",
            paths.angular + "core/directives/**/*.js",
            paths.angular + "app/**/*.js"
        ];
        
        var angularTemplates = paths.angular + "templates/**/*.html";
        
        var angularDest = paths.assets + "js/angular/";
        
        var scripts = gulp.src(angularScripts)
            .pipe(plugins.debug({title: "angular app:"}))
            .pipe(plugins.plumber())
            .pipe(plugins.concat("angular-scripts.js"))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.plumber.stop());
        
        var templates = gulp.src(angularTemplates)
            .pipe(plugins.debug({title: "angular templates:"}))
            .pipe(plugins.htmlmin())
            .pipe(plugins.angularTemplatecache("angular-templates.js",
                {
                    module: "AngularApp",
                    root: "templates/",
                    templateHeader: "angular.module(\"<%= module %>\").run([\"$templateCache\", function($templateCache) {"
                }));
        
        var bundle = new streamqueue({objectMode: true})
            .queue(scripts)
            .queue(templates)
            .done()
            .pipe(plugins.concat("angular-bundle.js"))
            .pipe(gulp.dest(angularDest))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(angularDest));
        
        return bundle;
    });
};