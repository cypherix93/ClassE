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