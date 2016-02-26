import shortid = require("shortid");

import {DbContext} from "../DbContext";

var thinky = DbContext.thinky;
var type = thinky.type;

var Section = thinky.createModel("Section",
    {
      // unique ID
      id: type.string()
          .default(shortid.generate),

      semester: type.string(),

      year: type.number(),

      times: [{
        day: type.string(), // there is way to add enumerated types to this, so things are limited to monday-friday etc
        startTime: type.number(), // i wasnt sure how to save an actual time, there appears to eb a date object but not a time
        endTime: type.number()
      }],
      // ID referencing the cooresponding course object
      courseId: type.string()
    }
    //realtions set in DbContext
    // many sections belong to a course
    // many sections belong to many teachers
    // many sections belong to many loading docks

);

export = Section;
