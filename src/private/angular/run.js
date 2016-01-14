// Configure Angular App Initialization
AngularApp
    .run(function ($rootScope, ConfigSvc)
    {
        ConfigSvc.GetAppMeta()
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
    });
