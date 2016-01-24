AngularApp.service("AuthSvc", function ($http, IdentitySvc)
{
    var exports = this;

    exports.loginUser = function (email, password)
    {
        $http.post("http://localhost:3960/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (response.success)
                {
                    IdentitySvc.currentUser = response.data;
                }
                else
                {

                }
            });
    };
});