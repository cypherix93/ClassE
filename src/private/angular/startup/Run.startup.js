// Configure Angular App Initialization
AngularApp.run(function ($rootScope, ConfigService, IdentityService, AuthService, ModalService)
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
});