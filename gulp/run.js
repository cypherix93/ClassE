"use strict";

module.exports = function (gulp, plugins, paths)
{
    gulp.task("run-server", ["compile-server"], function ()
    {
        return plugins.nodemon({
            script: "./build/server/server.js",
            watch: "./build/server/",
            env: {"NODE_ENV": "development"}
        });
    });

    gulp.task("run-client", ["compile-client"], function ()
    {
        var server = plugins.liveServer.static("./build/client", 3970);
        server.start();

        gulp.watch("./build/client/**", function (file)
        {
            server.notify.apply(server, [file]);
        });
    });
};