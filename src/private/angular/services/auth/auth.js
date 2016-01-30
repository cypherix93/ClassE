AngularApp.service("AuthSvc", function ($q, $window, ApiSvc, IdentitySvc)
{
    var exports = this;

    exports.bootstrapSessionUser = function ()
    {
        ApiSvc.get("/auth/me")
            .success(function (response)
            {
                if (response.success)
                    IdentitySvc.currentUser = response.data;
            });
    };

    exports.loginUser = function (email, password)
    {
        var def = $q.defer();

        ApiSvc.post("/auth/login", {email: email, password: password})
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

        ApiSvc.post("/auth/logout", {logout: true})
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