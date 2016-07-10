AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("login",
        {
            url: "/login",
            template: "<login-component></login-component>"
        });
});