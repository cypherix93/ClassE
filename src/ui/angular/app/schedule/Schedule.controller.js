AngularApp.controller("ScheduleController", function ScheduleController($scope, SemesterService)
{
    var self = this;

    self.currentSemester = SemesterService.getCurrentSemester();

    self.getNextSemester = function()
    {
        self.currentSemester = SemesterService.getNextSemester(self.currentSemester);
    };

    self.getPrevSemester = function()
    {
        self.currentSemester = SemesterService.getPrevSemester(self.currentSemester);
    };
});