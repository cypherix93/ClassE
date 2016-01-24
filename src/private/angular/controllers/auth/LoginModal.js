AngularApp.controller("LoginModalCtrl", function ($scope, AuthSvc, IdentitySvc, toastr)
{
    $scope.doLogin = function ()
    {
        if (!$scope.email || !$scope.password)
            return;

        AuthSvc.loginUser($scope.email, $scope.password)
            .then(function (response)
            {
                if (!response.success)
                    toastr.error(response.message);

                toastr.success("Welcome back " + IdentitySvc.email);
            });
    };
});