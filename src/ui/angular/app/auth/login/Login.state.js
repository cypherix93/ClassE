AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("login",
        {
            url: "/login",
            templateUrl: "views/auth/login/index.html",
            onEnter: function($rootScope)
            {
                $rootScope.PageName = "Login"
            }
        });
});