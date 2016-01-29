// Configure Angular App Preferences
AngularApp.config(function ($httpProvider)
{
    $httpProvider.interceptors.push(function ($window)
    {
        return {
            request: function (req)
            {
                req.headers = req.headers || {};
                if ($window.sessionStorage.token)
                {
                    req.headers["x-access-token"] = $window.sessionStorage.token;
                }
                return req;
            }
        };
    });

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