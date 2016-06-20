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
AngularApp.config(function ($httpProvider)
{
    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(function ($location)
    {
        return {
            "responseError": function (error)
            {
                if (error.status === 404)
                    $location.path("/error/404");
            }
        };
    });
});

AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
});
// Configure Angular App Routes
AngularApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider)
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
});
// Configure Angular App Initialization
AngularApp.run(function ($rootScope, ConfigSvc, IdentitySvc, AuthSvc, ModalSvc)
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
});
AngularApp.service("AuthSvc", function ($q, $window, ApiSvc, IdentitySvc)
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

    exports.registerUser = function (user)
    {
        var def = $q.defer();

        ApiSvc.post("/auth/register", user)
            .success(function (response)
            {
                def.resolve(response);
            });

        return def.promise;
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
});
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
AngularApp.service("ApiSvc", function ($http, ConstantsSvc)
{
    var exports = this;

    var baseUrl = ConstantsSvc.apiBaseUrl;

    var bindMethods = function ()
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

    var bindMethodsWithData = function ()
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

    bindMethods("get", "delete", "head", "jsonp");
    bindMethodsWithData("post", "put", "patch");
});
AngularApp.service("ModalSvc", function ($q, $http, $compile, $rootScope)
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
});
AngularApp.service("ConfigSvc", function($http)
{
    var exports = this;

    exports.getAppMeta = function()
    {
        return $http.get("angular/meta.json");
    };
});
AngularApp.service("ConstantsSvc", function ()
{
    var exports = this;

    exports.apiBaseUrl = "http://localhost:3960";
});
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put('templates/modal-template.html','<div class="modal fade">\r\n    <div class="modal-header">\r\n        <button type="button" class="close pull-right" data-dismiss="modal">\r\n            <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>\r\n        </button>\r\n\r\n        <h4 ng-transclude transclude-from="modal-title">\r\n            Modal Title\r\n        </h4>\r\n    </div>\r\n    <div class="modal-body" ng-transclude transclude-from="modal-body">\r\n        Modal Body\r\n    </div>\r\n</div>');}]);