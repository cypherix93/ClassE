AngularApp.controller("RegisterController", function RegisterController($scope, $state, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    var self = this;

    self.user = {};

    self.register = function ()
    {
        if (!self.user.email || !self.user.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }

        AuthSvc.registerUser(self.user)
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
                toastr.success("Thanks for signing up " + self.user.email);
            });
    };
});