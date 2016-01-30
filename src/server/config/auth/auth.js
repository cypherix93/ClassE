var cookieParser = require("cookie-parser");
var cors = require("cors");

var AuthHelper = require(ClassE.config.rootPath + "/helpers/authHelper");

var authConfig = function (app)
{
    console.log("=> Setting up Auth...");

    //Hook up the auth related middlewares
    app.use(cookieParser());
    app.use(cors(ClassE.config.cors));

    // Setup Passport
    require("./passport")(app);

    // Setup JSON Web Token auth flow
    app.use(function(req, res, next)
    {
        // check cookies or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.cookies.accessToken;

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
};

module.exports = authConfig;