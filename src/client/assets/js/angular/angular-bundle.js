// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "ui.router",
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
AngularApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(false);

    // Home page routes
    $stateProvider.state("home",
        {
            url: "/",
            templateUrl: "views/home/index.html"
        });

    // Error routes
    $stateProvider.state("error",
        {
            url: "/error/:status",
            templateUrl: function (urlattr)
            {
                return "views/error/" + urlattr.status + ".html";
            }
        });
}]);
// Configure Angular App Initialization
AngularApp.run(["$rootScope", "ConfigService", "IdentityService", "AuthService", "ModalService", function ($rootScope, ConfigService, IdentityService, AuthService, ModalService)
{
    // App Metadata setup
    ConfigService.getAppMeta()
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

    // Setup user in session if any
    AuthService.bootstrapSessionUser();

    // Init Global Modals
    ModalService.initGlobalModals();
}]);
AngularApp.service("ConfigService", ["$http", function($http)
{
    var exports = this;

    exports.getAppMeta = function()
    {
        return $http.get("assets/js/angular/meta.json");
    };
}]);
AngularApp.service("ConstantsService", function ()
{
    var self = this;

    self.apiBaseUrl = "http://localhost:3960";
});
AngularApp.service("AuthService", ["$q", "$window", "ApiService", "IdentityService", function ($q, $window, ApiService, IdentityService)
{
    var self = this;

    self.bootstrapSessionUser = function ()
    {
        ApiService.get("/auth/me")
            .success(function (response)
            {
                if (response.success)
                    IdentityService.currentUser = response.data;
            });
    };

    self.registerUser = function (user)
    {
        var def = $q.defer();

        ApiService.post("/auth/register", user)
            .success(function (response)
            {
                def.resolve(response);
            });

        return def.promise;
    };

    self.loginUser = function (email, password)
    {
        var def = $q.defer();

        ApiService.post("/auth/login", {email: email, password: password})
            .success(function (response)
            {
                if (response.success)
                {
                    IdentityService.currentUser = response.data;

                    $window.sessionStorage.token = IdentityService.currentUser.token;
                }
                else
                {
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };

    self.logoutUser = function ()
    {
        var def = $q.defer();

        ApiService.post("/auth/logout", {logout: true})
            .success(function (response)
            {
                if (response.success)
                {
                    delete IdentityService.currentUser;
                    delete $window.sessionStorage.token;
                }

                def.resolve(response);
            });

        return def.promise;
    };
}]);
AngularApp.service("IdentityService", function ()
{
    var self = this;

    // Current User Identity
    self.currentUser = undefined;

    // Function to check if the current user is authenticated
    self.isAuthenticated = function ()
    {
        return !!self.currentUser;
    };
});
AngularApp.service("ApiService", ["$http", "ConstantsService", function ($http, ConstantsService)
{
    var self = this;

    var baseUrl = ConstantsService.apiBaseUrl;

    var bindMethods = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            self[arg] = (function(method)
            {
                return function (apiUrl, config)
                {
                    return $http[method](baseUrl + apiUrl, config);
                }
            })(arg);
        }
    };

    var bindMethodsWithData = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];

            self[arg] = (function(method)
            {
                return function (apiUrl, data, config)
                {
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
    };

    bindMethods("get", "delete", "head", "jsonp");
    bindMethodsWithData("post", "put", "patch");
}]);
AngularApp.service("ModalService", ["$q", "$http", "$compile", "$rootScope", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.element = element;
        _instance.state = "default";

        _instance.onOpen = options.onOpen;
        _instance.onClose = options.onClose;

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

            if (_instance.onOpen)
                _instance.onOpen();
        });
        _instance.element.on("hidden", function ()
        {
            if (_instance.onClose)
                _instance.onClose();
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

    exports.waitUntilReady = function (modalName)
    {
        var def = $q.defer();

        var watch = $rootScope.$watch(function()
        {
            return !!exports.modals[modalName];
        }, function()
        {
            def.resolve(exports.modals[modalName]);
            watch();
        });

        return def.promise;
    };

    // Global modals init function
    exports.initGlobalModals = function ()
    {
    };
}]);
AngularApp.component("loginComponent", {
    controller: "LoginController as Login",
    templateUrl: "views/auth/login/index.html"
});
AngularApp.controller("LoginController", ["$scope", "$state", "AuthService", "IdentityService", "ModalService", "toastr", function LoginController($scope, $state, AuthService, IdentityService, ModalService, toastr)
{
    var self = this;
    
    self.login = function ()
    {
        if (!self.email || !self.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }
        
        AuthService.loginUser(self.email, self.password)
            .then(function (response)
            {
                if (!response.success)
                {
                    toastr.error(response.message);
                    return;
                }
                
                // Redirect to home page
                $state.go("home");
                
                // Display toast message
                toastr.success("Welcome back " + IdentitySvc.currentUser.email);
            });
    };
}]);
AngularApp.config(["$stateProvider", function ($stateProvider)
{
    $stateProvider.state("login",
        {
            url: "/login",
            template: "<login-component></login-component>"
        });
}]);
AngularApp.component("registerComponent", {
    controller: "RegisterController as Login",
    templateUrl: "views/auth/register/index.html"
});
AngularApp.controller("RegisterController", ["$scope", "$state", "AuthService", "IdentityService", "ModalService", "toastr", function RegisterController($scope, $state, AuthService, IdentityService, ModalService, toastr)
{
    var self = this;

    self.user = {};

    self.register = function ()
    {
        if (!self.user.email || !self.user.password)
        {
            toastr.error("Both email and password needs to be provided.");
            return;
        }

        AuthService.registerUser(self.user)
            .then(function (response)
            {
                if (!response.success)
                {
                    toastr.error(response.message);
                    return;
                }

                // Redirect to login
                $state.go("login");

                // Display toast message
                toastr.success("Thanks for signing up " + self.user.email);
            });
    };
}]);
AngularApp.config(["$stateProvider", function ($stateProvider)
{
    $stateProvider.state("register",
        {
            url: "/register",
            template: "<register-component></register-component>"
        });
}]);
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put('templates/modal-template.html','<div class="modal fade">\r\n    <div class="modal-header">\r\n        <button type="button" class="close pull-right" data-dismiss="modal">\r\n            <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>\r\n        </button>\r\n\r\n        <h4 ng-transclude transclude-from="modal-title">\r\n            Modal Title\r\n        </h4>\r\n    </div>\r\n    <div class="modal-body" ng-transclude transclude-from="modal-body">\r\n        Modal Body\r\n    </div>\r\n</div>');}]);