"use strict";

var User = ClassE.models.User;

class UsersHelper {
    static async getAllUsers()
    {
        return await User.getAll().run();
    }

    static async getUser(userId, isCurrentUser)
    {
        try
        {
            return await User.get(userId).run();
        }
        catch (e)
        {
            return null;
        }
    }

    static async updateUser(userId, updatedUser)
    {
        var dbUser = await UsersHelper.getUser(userId, true);

        // Update changes that the user wants to make
        dbUser.preferences = updatedUser.preferences;

        await dbUser.save();

        // Everything went smoothly
        return {};
    }
}

module.exports = UsersHelper;