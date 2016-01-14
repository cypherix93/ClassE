// Configure Angular App Preferences
AngularApp
    .config(function ($httpProvider)
    {
        $httpProvider.interceptors.push(function ($location)
        {
            return {
                "responseError": function (error)
                {
                    if (error.status === 404)
                        $location.path("/error/404");
                }
            };
        });
    })
    .config(function ($routeProvider, $locationProvider)
    {
        $locationProvider.html5Mode(false);

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
    });