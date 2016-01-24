// Configure Angular App Initialization
AngularApp.run(function ($rootScope, ConfigSvc, IdentitySvc, ModalSvc)
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
    $rootScope.ModalSvc = ModalSvc;

    // Init Global Modals
    ModalSvc.initGlobalModals();
});