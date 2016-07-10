AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("register",
        {
            url: "/register",
            template: "<register-component></register-component>"
        });
});