import shortid = require("shortid");

import {DbContext} from "../DbContext";

var thinky = DbContext.thinky;
var type = thinky.type;
var LoadingDock = thinky.createModel("LoadingDock",
    {
      id: type.string()
          .default(shortid.generate),
      // a loading dock references a student
      studentId: type.string()
      // many lodaing docks reference many sections
      // a loading dock belongs to a student
    }
);

export = LoadingDock;
