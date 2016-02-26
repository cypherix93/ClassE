import shortid = require("shortid");

import {DbContext} from "../DbContext";

// var section = section.getSection;
var thinky = DbContext.thinky;
var type = thinky.type;

var Course = thinky.createModel("Course",
    {
      id: type.string()
          .default(shortid.generate),
      // an array of strings in case of classes shared between departments-- CSE, ISE
      department: type.array()
          .schema(type.string()),
      // the number of the course-- 376, 373
      courseNumber: type.number().integer(),
      // short description
      description: type.string(),
      // SBC requirement
      SBC: type.string(),
      // prereqs
      requirements: type.array()
          .schema({
            CourseId: type.string(),
            CourseDepartments: type.array().schema(type.string()),
            CourseNumber: type.number()
          }),
          // reference ID's instead of actual objects

      // any associated recitations?
      recitations: type.array().
          .schema({
            sectionId: type.string()
          }) // idk what the point f an object with a signle value is but it makes it clear
          // that we store ID's for reference rather than just plain strings

          // using this method of referencing ID's, we can do the same for recitataions


    }
    // relations go in DbContext

    // a course has many sections
    //Course.hasMany(Section, "sections", "id", "courseID"); //a course has many sections ie monday wednesday, 2:30 blah blah
    //Section.belongsTo(Course, "course", "courseID", "id"); //a section refers to a single course

    // many courses belong to many pools
    // many pools belong to many courses

);

export = Course;
