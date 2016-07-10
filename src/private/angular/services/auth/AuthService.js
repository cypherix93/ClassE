AngularApp.service("AuthService", function ($q, $window, ApiService, IdentityService)
{
    var self = this;

    self.bootstrapSessionUser = function ()
    {
        ApiService.get("/auth/me")
            .success(function (response)
            {
                if (response.success)
                    IdentityService.currentUser = response.data;
            });
    };

    self.registerUser = function (user)
    {
        var def = $q.defer();

        ApiService.post("/auth/register", user)
            .success(function (response)
            {
                def.resolve(response);
            });

        return def.promise;
    };

    self.loginUser = function (email, password)
    {
        var def = $q.defer();

        ApiService.post("/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (response.success)
                {
                    IdentityService.currentUser = response.data;

                    $window.sessionStorage.token = IdentityService.currentUser.token;
                }
                else
                {
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };

    self.logoutUser = function ()
    {
        var def = $q.defer();

        ApiService.post("/auth/logout", {logout: true})
            .success(function (response)
            {
                if (response.success)
                {
                    delete IdentityService.currentUser;
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };
});