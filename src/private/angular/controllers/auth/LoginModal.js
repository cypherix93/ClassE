AngularApp.controller("LoginModalCtrl", function ($scope, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    $scope.doLogin = function ()
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

                // Close the login modal
                ModalSvc.modals.login.close();

                // Reset the form
                $scope.email = undefined;
                $scope.password = undefined;

                // Display toast message
                toastr.success("Welcome back " + IdentitySvc.currentUser.email);
            });
    };
});