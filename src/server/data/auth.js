var authHelper = {};

var models = ClassE.models;
var User = models.User;
var Passport = models.Passport;

authHelper.isValidNewUser = async(function (user)
{
    if (!user.username || !user.password)
        return false;

    var userExists = await(User.count(x => x("username").eq(user.username)).execute()) > 0;

    if (userExists)
        return false;

    if (user.password.length < Passport.getPasswordMinLength())
        return false;

    return true;
});

module.exports = authHelper;