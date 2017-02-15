app.controller('calendarCtrl', function ($scope, $rootScope) {

    // console.log($rootScope.Showcalendar);
    $scope.weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));

    $scope.today = new Date();

    var date = new Date(firstday);
    var day = date.getDay();

    $scope.thisweek = []
    for (var i = 0; i < 7; i++) {
        if (i - day != 0) {
            var days = i - day;
            var newDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
            $scope.thisweek.push(newDate);
        } else
            $scope.thisweek.push(date);
    }

    $scope.calendars = $rootScope.Showcalendar;
    $scope.getdate = function (date) {
        var newdate = new Date(date);
        console.log(date);
        return newdate.getDate();
    }
 
    $scope.shows = $rootScope.Showcalendar;


});