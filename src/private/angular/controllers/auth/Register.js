AngularApp.controller("RegisterCtrl", function ($scope, $state, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    $scope.user = {};

    $scope.register = function ()
    {
        if (!$scope.user.email || !$scope.user.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }

        AuthSvc.registerUser($scope.user)
            .then(function (response)
            {
                if (!response.success)
                {
                    toastr.error(response.message);
                    return;
                }

                // Redirect to login
                $state.go("login");

                // Display toast message
                toastr.success("Thanks for signing up " + IdentitySvc.currentUser.email);
            });
    };
});