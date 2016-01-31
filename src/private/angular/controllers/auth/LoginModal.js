AngularApp.controller("LoginModalCtrl", function ($scope, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    var loginModal;

    ModalSvc.waitUntilReady("login")
        .then(function(modal)
        {
            loginModal = modal;

            // Reset the form when the modal closes
            loginModal.onClose = function()
            {
                delete $scope.email;
                delete $scope.password;
            };
        })

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

                // Close the login modal
                loginModal.close();

                // Display toast message
                toastr.success("Welcome back " + IdentitySvc.currentUser.email);
            });
    };
});