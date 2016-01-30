AngularApp.service("ApiSvc", function ($http, ConstantsSvc)
{
    var exports = this;

    var baseUrl = ConstantsSvc.apiBaseUrl;

    var createMethods = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            exports[arg] = (function(method)
            {
                return function (apiUrl, config)
                {
                    return $http[method](baseUrl + apiUrl, config);
                }
            })(arg);
        }
    };

    var createMethodsWithData = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            exports[arg] = (function(method)
            {
                return function (apiUrl, data, config)
                {
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
    };

    createMethods("get", "delete", "head", "jsonp");
    createMethodsWithData("post", "put", "patch");
});