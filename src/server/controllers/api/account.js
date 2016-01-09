var account = {};

account.login = {
    find: function (params, callback)
    {
        try
        {
            callback(null, "Hello there big boy!");
        }
        catch (error)
        {
            callback(error);
        }
    }
};

module.exports = account;