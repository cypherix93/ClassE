AngularApp.controller("LoginCtrl", function ($scope, $state, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    $scope.login = function ()
    {
        if (!$scope.email || !$scope.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }

        AuthSvc.loginUser($scope.email, $scope.password)
            .then(function (response)
            {
                if (!response.success)
                {
                    toastr.error(response.message);
                    return;
                }

                // Redirect to home page
                $state.go("home");

                // Display toast message
                toastr.success("Welcome back " + IdentitySvc.currentUser.email);
            });
    };
});