export class Repository
{
    protected model;

    constructor(model)
    {
        this.model = model;
    }

    // Get the model from the Repository
    public getModel()
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

    // Check existence
    public async exists(entityId)
    {
        try
        {
            await this.model.get(entityId);
            return true;
        }
        catch(err)
        {
            return false;
        }
    }

    // Create an entry
    public create(data)
    {
        return new this.model(data);
    }

    // Update an entry
    public async update(entityId, data)
    {
        // This line will throw error if entity with the given ID was not found
        var entity = await this.model.get(entityId).run();

        // If entity was found, update fields
        for (var prop in data)
        {
            if (!data.hasOwnProperty(prop))
                continue;

            entity[prop] = data[prop];
        }

        return entity;
    }

    // Delete an entry
    public async remove(entityId)
    {
        // This line will throw error if entity with the given ID was not found
        return await this.model.get(entityId).delete();
    }
}