AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("login",
        {
            url: "/login",
            templateUrl: "views/auth/login.html",
            controller: "LoginController as Login"
        });
});
AngularApp.controller("LoginController", function LoginController($scope, $state, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    var self = this;
    
    self.login = function ()
    {
        if (!self.email || !self.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }
        
        AuthSvc.loginUser(self.email, self.password)
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
})