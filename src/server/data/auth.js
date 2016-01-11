var authHelper = {};

var models = ClassE.models;
var User = models.User;
var Passport = models.Passport;

authHelper.validateNewUser = async function (user)
{
    if (!user.username || !user.password)
        return { error: "Username and Password must be specified." };

    var userExists = (await User.count(x => x("username").eq(user.username)).execute()) > 0;

    if (userExists)
        return { error: "A User with the same username already exists." };

    var passwordMinLength = Passport.getPasswordMinLength();

    if (user.password.length < passwordMinLength)
        return { error: "Password must be at least " + passwordMinLength + " characters long." };

    return { success: true };
};

module.exports = authHelper;