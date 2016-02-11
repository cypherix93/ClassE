import bodyParser = require("body-parser");

import {DbConfig} from "./db/DbConfig";
import {AuthConfig} from "./auth/AuthConfig";
import {RoutesConfig} from "./routes/RoutesConfig";

export class Bootstrap
{
    public static init(app)
    {
        console.log("=> Bootstrapping application...");

        // Configure express middlewares
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        // Connect to RethinkDB
        DbConfig.init();

        // Setup authentication
        AuthConfig.init(app);

        // Setup routes
        RoutesConfig.init(app);
    }
}