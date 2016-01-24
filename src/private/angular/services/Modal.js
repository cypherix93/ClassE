AngularApp.service("ModalSvc", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.element = $(element);
        _instance.state = "Default";
        _instance.open = function ()
        {
            _instance.element.modal("show");
        };
        _instance.close = function ()
        {
            _instance.element.modal("hide");
        };

        var dialog = _instance.element;

        // Init the modal
        dialog.modal({
            show: false
        });

        // Width fix
        dialog.width(options.width);

        // Event Handlers
        dialog.on("show", function ()
        {
            // Margin fix
            dialog.css("margin-left", -(dialog.width() / 2));

            if (options.onOpen)
                options.onOpen(dialog);
        });
        dialog.on("hidden", function ()
        {
            if (options.onClose)
                options.onClose(dialog);
        });

        // Finally compile the template with angular
        _instance.element = $compile(dialog)($rootScope);
    };

    // Create modal from Template URL
    exports.createModal = function (templateUrl, options)
    {
        var def = $q.defer();

        // Get the template markup from the URL provided
        $http.get(templateUrl)
            .success(function (response)
            {
                var modalInstance = new ModalInstance(response, options || {width: 600});
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
                exports.modals.Login = modalInstance;
            });
    };
});