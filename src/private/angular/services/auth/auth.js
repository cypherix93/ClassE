AngularApp.service("AuthSvc", function ($q, $http, IdentitySvc)
{
    var exports = this;

    exports.loginUser = function (email, password)
    {
        var def = $q.defer();

        $http.post("http://localhost:3960/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (response.success)
                    IdentitySvc.currentUser = response.data;

                def.resolve(response);
            });

        return def.promise;
    };
});