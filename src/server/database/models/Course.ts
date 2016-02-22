import shortid = require("shortid");

import {DbContext} from "../DbContext";

//import Section from "../section"

// var section = section.getSection;
var thinky = DbContext.thinky;
var type = thinky.type;

var Course = thinky.createModel("Course",
    {
      id: type.string()
          .default(shortid.generate),

      department: type.array()
          .schema(type.string()),

      courseNumber: type.number(),

      description: type.string(),

      SBC: type.string(),
      /*
      requirements: type.array()
          .schema(Course) // this has to be instituted as a relation, not as part of the schema becasue it refers to models
          // actually, i end up having no idea how to really do this
      */
      /*
      recitations: type.array().
          .schema(Section) // this one is definitely a relation but im not sure how to import the class
      */

    }
    // set relations

    //Course.hasMany(Section, "sections", "id", "courseID"); //a course has many sections
    //Section.belongsTo(Course, "course", "courseID", "id"); //a section refers to a single course

)
