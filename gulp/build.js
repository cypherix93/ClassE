"use strict";

module.exports = function (gulp, plugins, paths)
{
    require("./build/clean")(gulp, plugins, paths);
    require("./build/build")(gulp, plugins, paths);
    require("./build/deploy")(gulp, plugins, paths);
};