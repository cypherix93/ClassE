AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("register",
        {
            url: "/register",
            templateUrl: "views/auth/register/index.html",
            onEnter: function($rootScope)
            {
                $rootScope.PageName = "Register"
            }
        });
});