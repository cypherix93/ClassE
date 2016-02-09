import {Repository} from "../Repository";

export class UserRepository extends Repository
{
    public async updateUser(userId, updatedUser)
    {
        var dbUser = await this.getById(userId);

        // Update changes that the user wants to make
        dbUser.preferences = updatedUser.preferences;

        await dbUser.save();

        // Everything went smoothly
        return {};
    }
}