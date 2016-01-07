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
    .run(["$rootScope", "$http", function ($rootScope, $http)
    {
        $http.get("angular/meta.json")
            .success(function(response)
            {
                $rootScope.AppName = response.name;
                $rootScope.AppVersion = response.version;
                $rootScope.AppDescription = response.description;
                $rootScope.AppCopyright = response.copyright;
                $rootScope.AppAuthors = response.authors;
            });

        $rootScope.PageName = "Home";
    }]);

// Configure Angular App Preferences
AngularApp
    .config(["$routeProvider", function ($routeProvider)
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
    }])
    .config(["$locationProvider", function ($locationProvider)
    {
        $locationProvider.html5Mode(true);
    }]);