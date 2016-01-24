AngularApp.service("AuthSvc", function ($q, $http, IdentitySvc)
{
    var exports = this;

    exports.loginUser = function (email, password)
    {
        var def = $q.defer();

        $http.post("http://localhost:3960/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (!response.success)
                    def.resolve({success: true, message: response.message});

                IdentitySvc.currentUser = response.data;
                def.resolve({success: true});
            });

        return def.promise;
    };
});