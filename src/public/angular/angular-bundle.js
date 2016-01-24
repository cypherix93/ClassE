// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngRoute",
        "ngAnimate",
        "ngMessages",
        "ui.bootstrap"
    ]);
AngularApp.service("ConfigSvc", ["$http", function($http)
{
    var exports = this;

    exports.GetAppMeta = function()
    {
        return $http.get("angular/meta.json");
    };
}]);
AngularApp.service("AuthSvc", ["$q", "$http", "IdentitySvc", function ($q, $http, IdentitySvc)
{
    var exports = this;

    exports.loginUser = function (email, password)
    {
        var def = $q.defer();

        $http.post("http://localhost:3960/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (!response.success)
                    def.resolve({success: true, message: response.message});

                IdentitySvc.currentUser = response.data;
                def.resolve({success: true});
            });

        return def.promise;
    };
}]);
AngularApp.service("IdentitySvc", function ()
{
    var exports = this;

    // Current User Identity
    exports.currentUser = undefined;

    // Function to check if the current user is authenticated
    exports.isAuthenticated = function ()
    {
        return !!exports.currentUser;
    };
});
AngularApp.controller("LoginModalCtrl", ["$scope", "AuthSvc", "IdentitySvc", "toastr", function ($scope, AuthSvc, IdentitySvc, toastr)
{
    $scope.doLogin = function ()
    {
        if (!$scope.email || !$scope.password)
            return;

        AuthSvc.loginUser($scope.email, $scope.password)
            .then(function (response)
            {
                if (!response.success)
                    toastr.error(response.message);

                toastr.success("Welcome back " + IdentitySvc.email);
            });
    };
}]);