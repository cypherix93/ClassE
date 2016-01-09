/* Global Angular App Declaration */

var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngRoute",
        "ngAnimate",
        "ngMessages",
        "ui.bootstrap"
    ]);

// Configure Angular App Initialization
AngularApp
    .run(function ($rootScope, ConfigSvc)
    {
        ConfigSvc.GetAppMeta()
            .then(function(response)
            {
                $rootScope.AppMeta = {
                    Name: response.data.name,
                    Version: response.data.version,
                    Description: response.data.description,
                    Copyright: response.data.copyright,
                    Authors: response.data.authors
                };
            });

        $rootScope.PageName = "Home";
    });

// Configure Angular App Preferences
AngularApp
    .config(function ($routeProvider)
    {
        $routeProvider
        // route for the home page
            .when("/",
                {
                    templateUrl: "views/home/index.html"
                })
            // route patterns for the other pages
            .when("/:base/:sub",
                {
                    templateUrl: function (urlattr)
                    {
                        return "views/" + urlattr.base + "/" + urlattr.sub + ".html";
                    }
                })
            .when("/:base",
                {
                    templateUrl: function (urlattr)
                    {
                        return "views/" + urlattr.base + "/index.html";
                    }
                });
    })
    .config(function ($locationProvider)
    {
        $locationProvider.html5Mode(false);
    });