AngularApp.service("ApiService", function ($http, ConstantsService)
{
    var self = this;

    var baseUrl = ConstantsService.apiBaseUrl;

    var bindMethods = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            self[arg] = (function(method)
            {
                return function (apiUrl, config)
                {
                    return $http[method](baseUrl + apiUrl, config);
                }
            })(arg);
        }
    };

    var bindMethodsWithData = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            self[arg] = (function(method)
            {
                return function (apiUrl, data, config)
                {
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
    };

    bindMethods("get", "delete", "head", "jsonp");
    bindMethodsWithData("post", "put", "patch");
});