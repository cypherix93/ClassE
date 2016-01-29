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