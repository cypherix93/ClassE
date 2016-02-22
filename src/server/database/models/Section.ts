import shortid = require("shortid");

import {DbContext} from "../DbContext";

// import Course from "../course";

//var Course = course.getCourse();
var thinky = DbContext.thinky;
var type = thinky.type;

var Section = thinky.createModel("Section",
    {
      id: type.string()
          .default(shortid.generate),

      semester: type.string(),

      year: type.number(),

      times: [{
        day: type.string(), // there is way to add enumerated types to this, so things are limited to monday-friday etc
        startTime: type.number(), // i wasnt sure how to save an actual time, there appears to eb a date object but not a time
        endTime: type.number()
      }],

      courseID: type.string()
    }
    // realtion here to the course class, or can all that be done in the course class itself? probably
);
