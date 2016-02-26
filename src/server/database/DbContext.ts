import {Repository} from "./Repository";

// Constructor
export class DbContext
{
    // Instance of rethinkdb context
    public static thinky;

    // DbContext.models gets populated when app inits
    public static models;

    // DbContext.repositories gets populated when app inits
    public static repositories;

    // Called after all models have been initialized
    // all relations go here
    public static onModelsCreated()
    {
        var models = DbContext.models;
        //Model.hasOne(OtherModel, fieldName, leftKey, rightKey);
        //Model.belongsTo(OtherModel, fieldName, leftKey, rightKey);
        //Model.hasAndBelongsToMany(OtherModel, fieldName, leftKey, rightKey);
        //Model.hasMany(OtherModel, fieldName, leftKey, rightKey);
        // Does Order matter here?
        // User 1---* Passport
        models.User.hasMany(models.Passport, "passports", "id", "userId");
        // User 1--1 Student
        models.User.hasOne(models.Student, "student", "id", "userId");
        models.Student.belongsTo(models.User, "user", "userId", "id");
        // Student 1---1 LoadingDock
        models.Student.hasOne(models.LoadingDock, "loadingDock", "id", "studentId");
        models.LoadingDock.belongsTo(models.student, "student", "studentId", "id");
        // Student 1---1 Pool
        models.Student.hasOne(models.Pool, "pool", "id", "studentId");
        models.Pool.belongsTo(models.Student, "student", "studentId", "id");
        // LoadingDock *---* Section
        models.LoadingDock.hasAndBelongsToMany(models.Section, "sections", "id", "id");
        models.Section.hasAndBelongsToMany(models.LoadingDock, "loadingDocks", "id", "id");
        // Pool *---* Course
        models.Pool.hasAndBelongsToMany(models.Course, "courses",  "id", "id");
        models.Course.hasAndBelongsToMany(models.Pool, "pools", "id", "id");
        // Course *---1 Section
        models.Course.hasMany(models.Section, "sections", "id", "courseId");
        //not sure if this one needs a reverse link
        // Section *---* Teacher
        models.Section.hasAndBelongsToMany(models.Teacher, "teachers", "id", "id");
        models.Teacher.hasAndBelongsToMany(models.Section, "sections", "id", "id");

    }
}
