AngularApp.service("AuthSvc", function ($q, $http, $window, IdentitySvc)
{
    var exports = this;

    exports.bootstrapSessionUser = function ()
    {
        $http.get("http://localhost:3960/auth/getSessionUser")
            .success(function (response)
            {
                if (response.success)
                    IdentitySvc.currentUser = response.data;
            });
    };

    exports.loginUser = function (email, password)
    {
        var def = $q.defer();

        $http.post("http://localhost:3960/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (response.success)
                {
                    IdentitySvc.currentUser = response.data;

                    $window.sessionStorage.token = IdentitySvc.currentUser.token;
                }
                else
                {
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };

    exports.logoutUser = function ()
    {
        var def = $q.defer();

        $http.post("http://localhost:3960/auth/logout", {logout: true})
            .success(function (response)
            {
                if (response.success)
                {
                    delete IdentitySvc.currentUser;
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };
});