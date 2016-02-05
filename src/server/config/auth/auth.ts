var cookieParser = require("cookie-parser");
var cors = require("cors");

var AuthHelper = require(ClassE.config.rootPath + "/helpers/AuthHelper");

var authConfig = function (app)
{
    console.log("=> Setting up Auth...");

    //Hook up the auth related middlewares
    app.use(cookieParser());
    app.use(cors(ClassE.config.cors));

    // Setup Passport
    require("./passport")(app);

    // Setup JSON Web Token auth flow
    app.use(AuthHelper.initJWTokenMiddleware);
};

module.exports = authConfig;