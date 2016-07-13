AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("schedule",
        {
            url: "/schedule",
            templateUrl: "views/schedule/index.html"
        });
});