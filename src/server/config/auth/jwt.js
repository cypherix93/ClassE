var moment = require("moment");

var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");

var jwtConfig = function (app)
{
    app.use(function (req, res, next)
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

            // Let's refresh the token if it has expired
            var newToken = refreshTokenIfExpired(decoded);
            if (newToken)
            {
                AuthHelper.setAuthCookie(newToken, res);
            }

            // Everything looks good, save to req.user
            req.user = decoded;

            // Carry on
            return next();
        });
    })

    var refreshTokenIfExpired = function (decoded)
    {
        var issuedAt = decoded.iat;
        var now = moment().unix().valueOf();

        var expiryDuration = ClassE.config.jwt.expiryInMinutes * 60;

        // If expired, refresh token
        if ((now - issuedAt) > expiryDuration)
        {
            // Set the issued at time to NOW
            decoded.iat = now;

            // Generate new token
            return AuthHelper.generateJWToken(decoded);
        }
        else
        {
            return null;
        }
    }
}

module.exports = jwtConfig;