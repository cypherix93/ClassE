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
        var index = getCurrentSemesterIndex(currentSem);

        // If last, loop back
        if (index === semestersOrder.length - 1)
            return semestersOrder[0];

        return semestersOrder[index + 1];
    };

    self.getPrevSemester = function (currentSem)
    {
        var index = getCurrentSemesterIndex(currentSem);

        // If last, loop back
        if (index === 0)
            return semestersOrder[semestersOrder.length - 1];

        return semestersOrder[index - 1];
    };

    self.getSemesterFromDate = function (date)
    {
        date = date || new Date();

        // TODO: Gotta get real data about semester begin and end. This code is only here for mocking.
        var month = date.getMonth();

        if (month === 0)
            return semesters.winter;

        if (month >= 1 && month <= 4)
            return semesters.spring;

        if (month >= 5 && month <= 7)
            return semesters.summer;

        if (month >= 8 && month <= 11)
            return semesters.summer;
    };

    function getCurrentSemesterIndex(currentSem)
    {
        currentSem = currentSem || self.getCurrentSemester();

        var index = semestersOrder.indexOf(currentSem);

        if (index < 0)
            throw new Errors("Current semester provided is invalid.");

        return index;
    }
});