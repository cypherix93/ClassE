import shortid = require("shortid");

import {DbContext} from "../DbContext";

var thinky = DbContext.thinky;
var type = thinky.type;

var User = thinky.createModel("User",
    {
        id: type.string()
            .default(shortid.generate),

        email: type.string()
            .email()
            .required(),

        createdAt: type.date()
            .default(thinky.r.now()),

        roles: type.array()
            .schema(type.string())
            .default(["User"])
    });

User.ensureIndex("email");

export = User;