var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");

var jwtConfig = function(app)
{
    app.use(function(req, res, next)
    {
        // check cookies or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.cookies["classe.presence"];

        if (!token)
            return next();

        // Verifies secret and checks expiry
        AuthHelper.verifyJWToken(token, function (err, decoded)
        {
            if (err)
                return res.sendStatus(403);

            // Everything looks good, save to req.user
            req.user = decoded;

            // Carry on
            return next();
        });
    })
}

module.exports = jwtConfig;