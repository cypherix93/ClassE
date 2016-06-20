AngularApp.service("ConfigSvc", function($http)
{
    var exports = this;

    exports.getAppMeta = function()
    {
        return $http.get("js/angular/meta.json");
    };
});