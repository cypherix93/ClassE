AngularApp.service("ModalSvc", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.scope = $rootScope.$new(true);
        _instance.element = element;
        _instance.state = "default";

        var compileFunc = $compile(_instance.element);
        _instance.element = compileFunc(_instance.scope);

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
                angular.element("body").append(element);

                var modalInstance = new ModalInstance(element, options || {width: 600});
                console.log(modalInstance);
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
});