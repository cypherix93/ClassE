AngularApp.service("SemesterService", function ()
{
    var self = this;

    var semesters = {
        spring: "SPRING",
        summer: "SUMMER",
        fall: "FALL",
        winter: "WINTER"
    };
    var semestersOrder = [
        semesters.spring,
        semesters.summer,
        semesters.fall,
        semesters.winter
    ];

    self.getCurrentSemester = function ()
    {
        return self.getSemesterFromDate();
    };

    self.getNextSemester = function (currentSem)
    {
        var index = getCurrentSemesterIndex(currentSem.semester);

        // If last, loop back
        if (index === semestersOrder.length - 1)
            return {
                semester: semestersOrder[0],
                year: currentSem.year + 1
            };

        return {
            semester: semestersOrder[index + 1],
            year: currentSem.year
        };
    };

    self.getPrevSemester = function (currentSem)
    {
        var index = getCurrentSemesterIndex(currentSem.semester);

        // If last, loop back
        if (index === 0)
            return {
                semester: semestersOrder[semestersOrder.length - 1],
                year: currentSem.year - 1
            };

        return {
            semester: semestersOrder[index - 1],
            year: currentSem.year
        };
    };

    self.getSemesterFromDate = function (date)
    {
        date = date || new Date();

        var semester;
        
        // TODO: Gotta get real data about semester begin and end. This code is only here for mocking.
        var month = date.getMonth();
        
        if (month === 0)
            semester = semesters.winter;

        else if (month >= 1 && month <= 4)
            semester = semesters.spring;

        else if (month >= 5 && month <= 7)
            semester = semesters.summer;

        else if (month >= 8 && month <= 11)
            semester = semesters.summer;
        
        return {
            semester: semester,
            year: date.getFullYear()
        }
    };

    function getCurrentSemesterIndex(currentSem)
    {
        var index = semestersOrder.indexOf(currentSem);

        if (index < 0)
            throw new Errors("Current semester provided is invalid.");

        return index;
    }
});