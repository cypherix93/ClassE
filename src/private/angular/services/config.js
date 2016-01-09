AngularApp.service("ConfigSvc", function($http)
{
    var exports = this;

    exports.GetAppMeta = function()
    {
        return $http.get("angular/meta.json");
    };
});