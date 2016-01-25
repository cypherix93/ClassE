// Configure Angular App Preferences
AngularApp.config(function ($httpProvider)
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
});

AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.maxOpened = 0;
    toastrConfig.newestOnTop = true;
    toastrConfig.positionClass = "toast-bottom-center";
});