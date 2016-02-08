import {DbContext} from "../database/DbContext";

var User = DbContext.getRepository("User").get();
var Passport = DbContext.getRepository("Passport").get();

export class UsersHelper
{
    public static async getAllUsers()
    {
        return await User.getAll().run();
    }

    public static async getUser(userId, isCurrentUser)
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

    public static async updateUser(userId, updatedUser)
    {
        var dbUser = await UsersHelper.getUser(userId, true);

        // Update changes that the user wants to make
        dbUser.preferences = updatedUser.preferences;

        await dbUser.save();

        // Everything went smoothly
        return {};
    }
}