import shortid = require("shortid");

import {DbContext} from "../DbContext";

var thinky = DbContext.thinky;
var type = thinky.type;

var Teacher = thinky.createModel("Teacher",
    {
      id: type.string()
          .default(shortid.generate),
      //teachers have names
      name: type.string(),
      // a ratemyprofessor ID
      RMPId: type.string(),

    }
    // many teachers belong to many sections
    // many sections also belong to many teachers

);

export = Teacher;
