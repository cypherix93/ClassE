// Global Package Info
var meta = require("./meta.json");

// Gulp
var gulp = require("gulp");
var bower = require("bower");
var plugins = require("gulp-load-plugins")();

// NPM Tools
var runSequence = require("run-sequence");
var merge = require("merge-stream");
var del = require("del");
var mainBowerFiles = require("main-bower-files");

// Directories
var buildDir = "./build/";
var deployDir = "./deploy/";
var projectDir = "./src/";
var publicDir = projectDir + "public/";
var contentDir = projectDir + "content/";

//<editor-fold desc="Build Tasks">
// Deploy App
gulp.task("default", function (callback)
{
    runSequence(
        "clean-dirs",
        "update-assembly-info",
        "bower-install",
        ["bundle-ng-files", "compile-sass"],
        callback
    );
});

// Clean Directories
gulp.task("clean-dirs", function (callback)
{
    return del([
            buildDir + "**",
            deployDir + "**"
        ],
        { force: true }, callback);
});

// Update Assembly Info
gulp.task("update-assembly-info", function ()
{
    // Update bower.json Info
    var bowerJson = gulp.src("./bower.json")
        .pipe(plugins.debug({ title: "bower.json:" }))
        .pipe(plugins.jsonEditor({
            name: meta.name,
            version: meta.version
        }))
        .pipe(gulp.dest("."));

    // Update package.json Info
    var packageJson = gulp.src("./package.json")
        .pipe(plugins.debug({ title: "package.json:" }))
        .pipe(plugins.jsonEditor({
            name: meta.name,
            version: meta.version,
            description: meta.description,
            copyright: meta.copyright,
            authors: meta.authors
        }))
        .pipe(gulp.dest("."));

    // Update meta.json Info
    var metaJson = gulp.src(publicDir + "angular/meta.json")
        .pipe(plugins.debug({ title: "meta.json:" }))
        .pipe(plugins.jsonEditor({
            name: meta.name,
            version: meta.version,
            description: meta.description,
            copyright: meta.copyright,
            authors: meta.authors
        }))
        .pipe(gulp.dest(publicDir + "angular/"));

    return merge(bowerJson, packageJson, metaJson);
});

//</editor-fold>

//<editor-fold desc="Bower and NPM Tasks">
// Restore NPM and Bower packages
gulp.task("bower-restore", function (callback)
{
    bower.commands.install([], { save: true }, {})
        .on("end", function (installed)
        {
            callback(); // notify gulp that this task is finished
        });
});

// Install Bower Packages
gulp.task("bower-install", ["bower-restore"], function ()
{
    var libDir = publicDir + "lib/";

    var jsFilter = plugins.filter(["**/*.js", "!**/*.min.js"], { restore: true });
    var cssFilter = plugins.filter(["**/*.css", "!**/*.min.css"], { restore: true });
    var fontFilter = plugins.filter(["**/*.eot", "**/*.woff", "**/*.woff2", "**/*.svg", "**/*.ttf"], { restore: true });
    var imageFilter = plugins.filter(["**/*.jpg", "**/*.png", "**/*.gif"], { restore: true });

    function generatePath(path)
    {
        function extractMainName(name)
        {
            var index = name.search(/[-.\\/]/);
            return index > 0 ? name.substring(0, index) : name;
        }

        var extDir = path.extname.substring(1);
        switch (extDir)
        {
            case "eot":
            case "woff":
            case "woff2":
            case "svg":
            case "ttf":
                extDir = "fonts";
                break;
            case "jpg":
            case "png":
            case "gif":
                extDir = "images";
                break;
        }
        path.dirname = "/" + extractMainName(path.dirname) + "/" + extDir;
    }

    // The main bower dependencies with only JS and CSS and fonts
    var mainBower = gulp.src(mainBowerFiles(), { base: "./bower_components" })
        // Install and Minify JS Files
        .pipe(jsFilter)
        .pipe(plugins.debug({ title: "js:" }))
        .pipe(plugins.rename(generatePath))
        .pipe(gulp.dest(libDir))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(libDir))
        .pipe(jsFilter.restore)

        // Install and Minify CSS Files
        .pipe(cssFilter)
        .pipe(plugins.debug({ title: "css:" }))
        .pipe(plugins.rename(generatePath))
        .pipe(gulp.dest(libDir))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(libDir))
        .pipe(cssFilter.restore)

        // Install Font Files
        .pipe(fontFilter)
        .pipe(plugins.debug({ title: "fonts:" }))
        .pipe(plugins.rename(generatePath))
        .pipe(gulp.dest(libDir))
        .pipe(fontFilter.restore)

        // Install Image Files
        .pipe(imageFilter)
        .pipe(plugins.debug({ title: "images:" }))
        .pipe(plugins.rename(generatePath))
        .pipe(gulp.dest(libDir))
        .pipe(imageFilter.restore);

    // Bootstrap SASS files
    var bootstrapSass = gulp.src("./bower_components/bootstrap-sass-official/assets/stylesheets/**/*.scss")
        .pipe(gulp.dest(contentDir + "sass/bootstrap/"));

    // Return merged stream
    return merge(mainBower, bootstrapSass);
});
//</editor-fold>

//<editor-fold desc="Misc Tasks">
// Bundle AngularJS files
gulp.task("bundle-ng-files", function ()
{
    var scripts = gulp.src(contentDir + "angular-app/**/*.js")
        .pipe(plugins.debug({ title: "angular app:" }))
        .pipe(plugins.concat("angular-bundle.js"))
        .pipe(plugins.ngAnnotate())
        .pipe(gulp.dest(publicDir + "angular/"))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(publicDir + "angular/"));

    var templates = gulp.src(contentDir + "angular-app/templates/**/*.html")
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest(publicDir + "angular/templates/"));

    return merge(scripts, templates);
});

// Compile SASS files
gulp.task("compile-sass", function ()
{
    var cssDir = publicDir + "css/";

    return gulp.src(contentDir + "sass/main.scss")
        .pipe(plugins.debug({ title: "compiling sass:" }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassGlob())
        .pipe(plugins.sass())
        .pipe(gulp.dest(cssDir))

        .pipe(plugins.minifyCss({ roundingPrecision: -1 }))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.sourcemaps.write("./"))
        .pipe(gulp.dest(cssDir));
});
//</editor-fold>