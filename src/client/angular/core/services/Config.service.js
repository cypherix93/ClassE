AngularApp.service("ConfigService", function($http)
{
    var exports = this;

    exports.getAppMeta = function()
    {
        return $http.get("assets/js/angular/meta.json");
    };
});