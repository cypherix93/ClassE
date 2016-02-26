import shortid = require("shortid");

import {DbContext} from "../DbContext";

var thinky = DbContext.thinky;
var type = thinky.type;

var Student = thinky.createModel("Student",
    {
      //unique id
      id: type.string()
          .default(shortid.generate),
      // id with which to reference associated user
      userID: type.string(),
      // a student has majors
      majors: [type.string()],
      // a student has minors
      minors: [type.string()],
      // a student has finished coursework
      completedCourses: [{
        courseID: type.string()
      }],

      standing: type.string(),
      // to reference the loading dock
      dockID: type.string(),
      // to reference the pool
      poolID: type.string()

    }
    // a single student belongs to a user
    // a single student has a single pool
    // a single student also has a single loading dock


);

export = Student;
