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
}

module.exports = UsersHelper;