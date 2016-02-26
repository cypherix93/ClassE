import shortid = require("shortid");

import {DbContext} from "../DbContext";

var thinky = DbContext.thinky;
var type = thinky.type;

var Pool = thinky.createModel("Pool",
    {
      id: type.string()
          .default(shortid.generate),

      studentId: type.string()

    }

    // many pools have many courses
    // a single pool belongs to a single student
);

export = Pool;
