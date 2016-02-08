export class Repository
{
    private model;

    constructor(model)
    {
        this.model = model;
    }

    // Get the model from the Repository
    public get()
    {
        return this.model;
    }

    // Get all the entries for this model
    public async getAll()
    {
        return await this.model.getAll().run();
    }

    // Get one entry by its ID
    public async getById(id)
    {
        try
        {
            return await this.model.get(id).run();
        }
        catch (e)
        {
            return null;
        }
    }
}