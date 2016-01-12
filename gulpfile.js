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
var paths = {};
paths.build = "./build/";
paths.deploy = "./deploy/";
paths.project = "./src/";
paths.public = paths.project + "public/";
paths.private = paths.project + "private/";
paths.angular = paths.private + "angular/";
paths.sass = paths.private + "sass/";

// Default Task
gulp.task("default", function (callback)
{
    runSequence(
        "update-package-info",
        "bower-install",
        "deploy",
        callback
    );
});

//
// Build Tasks
// ------------------------------------------------------------------------------
// Deploy App
gulp.task("deploy", ["build"],
    function ()
    {
        var server = gulp.src(paths.build + "server/**")
            .pipe(plugins.zip("server.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));

        var clientWeb = gulp.src(paths.build + "client-web/**")
            .pipe(plugins.zip("client-web.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));

        var clientMobile = gulp.src(paths.build + "client-mobile/**")
            .pipe(plugins.zip("client-mobile.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));

        merge(server, clientWeb, clientMobile);
    });

// Build App
gulp.task("build", ["clean-dirs", "bundle-ng-files", "compile-sass"],
    function ()
    {
        return gulp.src(paths.project + "server/**")
            .pipe(plugins.babel({
                presets: ["stage-0"]
            }))
            .pipe(gulp.dest(paths.build + "server/"));
    });

// Clean Directories
gulp.task("clean-dirs",
    function (callback)
    {
        return del([
                paths.build + "**",
                paths.deploy + "**"
            ],
            {force: true}, callback);
    });

//
// Bower and NPM Tasks
// ------------------------------------------------------------------------------
// Update Assembly Info
gulp.task("update-package-info",
    function ()
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

        return merge(bowerJson, packageJson);
    });

// Restore NPM and Bower packages
gulp.task("bower-restore",
    function (callback)
    {
        bower.commands.install([], {save: true}, {})
            .on("end", function (installed)
            {
                callback(); // notify gulp that this task is finished
            });
    });

// Install Bower Packages
gulp.task("bower-install", ["bower-restore"],
    function ()
    {
        var libDir = paths.public + "lib/";

        var jsFilter = plugins.filter(["**/*.js", "!**/*.min.js"], {restore: true});
        var cssFilter = plugins.filter(["**/*.css", "!**/*.min.css"], {restore: true});
        var fontFilter = plugins.filter(["**/*.eot", "**/*.woff", "**/*.woff2", "**/*.svg", "**/*.ttf"], {restore: true});
        var imageFilter = plugins.filter(["**/*.jpg", "**/*.png", "**/*.gif"], {restore: true});

        var generatePath = function (path)
        {
            var extractMainName = function (name)
            {
                var index = name.search(/[-.\\/]/);
                return index > 0 ? name.substring(0, index) : name;
            };

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
        };

        // The main bower dependencies with only JS and CSS and fonts
        var mainBower = gulp.src(mainBowerFiles(), {base: "./bower_components"})
            // Install and Minify JS Files
            .pipe(jsFilter)
            .pipe(plugins.debug({title: "js:"}))
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
            .pipe(plugins.debug({title: "css:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(plugins.cssnano())
            .pipe(plugins.rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(libDir))
            .pipe(cssFilter.restore)

            // Install Font Files
            .pipe(fontFilter)
            .pipe(plugins.debug({title: "fonts:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(fontFilter.restore)

            // Install Image Files
            .pipe(imageFilter)
            .pipe(plugins.debug({title: "images:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(imageFilter.restore);

        // Bootstrap SASS files
        var bootstrapSass = gulp.src("./bower_components/bootstrap-sass-official/assets/stylesheets/**/*.scss")
            .pipe(gulp.dest(paths.private + "sass/bootstrap/"));

        // Return merged stream
        return merge(mainBower, bootstrapSass);
    });

//
// Misc Tasks
// ------------------------------------------------------------------------------
// Bundle AngularJS files
gulp.task("bundle-ng-files",
    function ()
    {
        var scripts = gulp.src(paths.angular + "**/*.js")
            .pipe(plugins.debug({title: "angular app:"}))
            .pipe(plugins.concat("angular-bundle.js"))
            .pipe(plugins.ngAnnotate())
            .pipe(gulp.dest(paths.public + "angular/"))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(paths.public + "angular/"));

        var templates = gulp.src(paths.angular + "templates/**/*.html")
            .pipe(plugins.htmlmin())
            .pipe(gulp.dest(paths.public + "angular/templates/"));

        return merge(scripts, templates);
    });

// Compile SASS files
gulp.task("compile-sass",
    function ()
    {
        var cssDir = paths.public + "css/";

        return gulp.src(paths.sass + "main.scss")
            .pipe(plugins.debug({title: "compiling sass:"}))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sassGlob())
            .pipe(plugins.sass())
            .pipe(gulp.dest(cssDir))

            .pipe(plugins.cssnano())
            .pipe(plugins.rename({suffix: ".min"}))
            .pipe(plugins.sourcemaps.write("./"))
            .pipe(gulp.dest(cssDir));
    });

//
// Watch Tasks
// ------------------------------------------------------------------------------
// Watch client files for changes
gulp.task("watch",
    function ()
    {
        gulp.watch([paths.angular + "**/*.js", paths.angular + "templates/**/*.html"],
            ["bundle-ng-files"]);

        gulp.watch(paths.sass + "sass/main.scss",
            ["compile-sass"]);
    });

