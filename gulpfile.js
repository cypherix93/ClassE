"use strict";

// Global Package Info
var meta = require("./meta.json");

// Gulp
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

// NPM Tools
var runSequence = require("run-sequence");
var streamqueue = require("streamqueue");

// Directories
var paths = {};

paths.build = "./build/";
paths.deploy = "./deploy/";
paths.project = "./src/";

paths.client = paths.project + "client/";
paths.server = paths.project + "server/";

paths.assets = paths.client + "assets/";
paths.lib = paths.assets + "lib/";
paths.angular = paths.client + "angular/";
paths.sass = paths.client + "sass/";

// Default Task
gulp.task("default", function (callback)
{
    runSequence(
        "install-packages",
        "deploy",
        callback
    );
});

// Load the tasks from files

// Package Tasks
require("./gulp/packages")(gulp, plugins, paths, meta);

// Compile Tasks
require("./gulp/compile")(gulp, plugins, paths, meta);

// Build Tasks
require("./gulp/build")(gulp, plugins, paths, meta);

// Watch Tasks
require("./gulp/watch")(gulp, plugins, paths, meta);

