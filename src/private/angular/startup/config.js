// Configure Angular App Preferences

// HTTP Configuration, like cookie, JWT and error handling
AngularApp.config(function ($httpProvider)
{
    $httpProvider.defaults.withCredentials = true;

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
});

AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
});