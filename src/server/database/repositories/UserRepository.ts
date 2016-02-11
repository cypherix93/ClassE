import {Repository} from "../Repository";

export class UserRepository extends Repository
{
    public async getByEmail(email)
    {
        try
        {
            return await this.model
                .filter({email: email})
                .nth(0)
                .run();
        }
        catch(err)
        {
            return null;
        }
    }
}