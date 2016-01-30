// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngRoute",
        "ngAnimate",
        "ngMessages",
        "ui.bootstrap",
        "toastr"
    ]);
// Configure Angular App Preferences

// HTTP Configuration, like cookie, JWT and error handling
AngularApp.config(["$httpProvider", function ($httpProvider)
{
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(["$location", function ($location)
    {
        return {
            "responseError": function (error)
            {
                if (error.status === 404)
                    $location.path("/error/404");
            }
        };
    }]);
}]);

AngularApp.config(["toastrConfig", function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
}]);
// Configure Angular App Routes
AngularApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider)
{
    $locationProvider.html5Mode(false);

    $routeProvider
    // route for the home page
        .when("/",
            {
                templateUrl: "views/home/index.html"
            })
        // route patterns for the other pages
        .when("/:base/:sub",
            {
                templateUrl: function (urlattr)
                {
                    return "views/" + urlattr.base + "/" + urlattr.sub + ".html";
                }
            })
        .when("/:base",
            {
                templateUrl: function (urlattr)
                {
                    return "views/" + urlattr.base + "/index.html";
                }
            });
}]);
// Configure Angular App Initialization
AngularApp.run(["$rootScope", "ConfigSvc", "IdentitySvc", "AuthSvc", "ModalSvc", function ($rootScope, ConfigSvc, IdentitySvc, AuthSvc, ModalSvc)
{
    // App Metadata setup
    ConfigSvc.getAppMeta()
        .then(function (response)
        {
            $rootScope.AppMeta = {
                Name: response.data.name,
                Version: response.data.version,
                Description: response.data.description,
                Copyright: response.data.copyright,
                Authors: response.data.authors
            };
        });

    $rootScope.PageName = "Home";

    // Global services
    $rootScope.IdentitySvc = IdentitySvc;
    $rootScope.AuthSvc = AuthSvc;
    $rootScope.ModalSvc = ModalSvc;

    // Setup user in session if any
    AuthSvc.bootstrapSessionUser();

    // Init Global Modals
    ModalSvc.initGlobalModals();
}]);
AngularApp.service("ApiSvc", ["$http", "ConstantsSvc", function ($http, ConstantsSvc)
{
    var exports = this;

    var baseUrl = ConstantsSvc.apiBaseUrl;

    var createMethods = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            exports[arg] = (function(method)
            {
                return function (apiUrl, config)
                {
                    return $http[method](baseUrl + apiUrl, config);
                }
            })(arg);
        }
    };

    var createMethodsWithData = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            exports[arg] = (function(method)
            {
                return function (apiUrl, data, config)
                {
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
    };

    createMethods("get", "delete", "head", "jsonp");
    createMethodsWithData("post", "put", "patch");
}]);
AngularApp.service("AuthSvc", ["$q", "$window", "ApiSvc", "IdentitySvc", function ($q, $window, ApiSvc, IdentitySvc)
{
    var exports = this;

    exports.bootstrapSessionUser = function ()
    {
        ApiSvc.get("/auth/me")
            .success(function (response)
            {
                if (response.success)
                    IdentitySvc.currentUser = response.data;
            });
    };

    exports.loginUser = function (email, password)
    {
        var def = $q.defer();

        ApiSvc.post("/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (response.success)
                {
                    IdentitySvc.currentUser = response.data;

                    $window.sessionStorage.token = IdentitySvc.currentUser.token;
                }
                else
                {
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };

    exports.logoutUser = function ()
    {
        var def = $q.defer();

        ApiSvc.post("/auth/logout", {logout: true})
            .success(function (response)
            {
                if (response.success)
                {
                    delete IdentitySvc.currentUser;
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
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
AngularApp.service("ModalSvc", ["$q", "$http", "$compile", "$rootScope", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.element = element;
        _instance.state = "default";

        // Init the modal
        _instance.element.modal({
            show: false
        });

        // Width fix
        _instance.element.width(options.width);

        // Event Handlers
        _instance.element.on("show", function ()
        {
            // Margin fix
            _instance.element.css("margin-left", -(_instance.element.width() / 2));

            if (options.onOpen)
                options.onOpen(_instance.element);
        });
        _instance.element.on("hidden", function ()
        {
            if (options.onClose)
                options.onClose(_instance.element);
        });

        // Open and Close functions
        _instance.open = function ()
        {
            _instance.element.modal("show");
        };
        _instance.close = function ()
        {
            _instance.element.modal("hide");
        };
    };

    // Create modal from Template URL
    exports.createModal = function (templateUrl, options)
    {
        var def = $q.defer();

        // Get the template markup from the URL provided
        $http.get(templateUrl)
            .success(function (response)
            {
                var element = angular.element(response);

                var scope = $rootScope.$new(true);
                $compile(element)(scope);

                angular.element("#content-container").append(element);

                var modalInstance = new ModalInstance(element, options || {width: 600});

                def.resolve(modalInstance);
            });

        return def.promise;
    };

    // Store for all the global modals
    exports.modals = {};

    // Global modals init function
    exports.initGlobalModals = function ()
    {
        // Login Modal
        exports.createModal("views/_shared/auth/login.html")
            .then(function(modalInstance)
            {
                exports.modals.login = modalInstance;
            });
    };
}]);
AngularApp.service("ConfigSvc", ["$http", function($http)
{
    var exports = this;

    exports.getAppMeta = function()
    {
        return $http.get("angular/meta.json");
    };
}]);
AngularApp.service("ConstantsSvc", function ()
{
    var exports = this;

    exports.apiBaseUrl = "http://localhost:3960";
});
AngularApp.controller("LoginModalCtrl", ["$scope", "AuthSvc", "IdentitySvc", "ModalSvc", "toastr", function ($scope, AuthSvc, IdentitySvc, ModalSvc, toastr)
{
    $scope.login = function ()
    {
        if (!$scope.email || !$scope.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }

        AuthSvc.loginUser($scope.email, $scope.password)
            .then(function (response)
            {
                if (!response.success)
                {
                    toastr.error(response.message);
                    return;
                }

                // Close the login modal
                ModalSvc.modals.login.close();

                // Reset the form
                delete $scope.email;
                delete $scope.password;

                // Display toast message
                toastr.success("Welcome back " + IdentitySvc.currentUser.email);
            });
    };
}]);