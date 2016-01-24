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