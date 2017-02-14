app.controller('calendarCtrl', function ($scope, $rootScope) {

    // console.log($rootScope.Showcalendar);
    $scope.weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));

    //  console.log(firstday);

    var date = new Date(firstday);
    var day = date.getDay();

    $scope.calendars = []
    $scope.thisweek = []
    for (var i = 0; i < 7; i++) {
        if (i - day != 0) {
            var days = i - day;
            var newDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
            //if(newDate.getDate() == )
            for (var j = 0; j < $rootScope.Showcalendar.length; j++) {
                var showdate = new Date($rootScope.Showcalendar[j].first_aired);
                if (newDate.getDate() == showdate.getDate()) {
                    $rootScope.Showcalendar[j].date = newDate.getDate();
                    $scope.calendars.push($rootScope.Showcalendar[j]);
                }
            }
            $scope.thisweek.push(newDate);
        }
        else
            $scope.thisweek.push(date);
    }
    console.log($scope.calendars);
    $scope.shows = $rootScope.Showcalendar;

    
});