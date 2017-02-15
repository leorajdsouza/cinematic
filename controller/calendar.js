app.controller('calendarCtrl', function ($scope, $rootScope, TraktTVv2) {

    var watchlist = [];
    function WatchedCallback(data) {
        angular.forEach(data, function (value, key) {
            watchlist.push(value.show.ids);
        }, watchlist);
        $rootScope.watchlist = watchlist;
        TraktTVv2.getShowCalendar($rootScope.watchlist, calendarCallback);
    }

    TraktTVv2.getUserWatchlist("bux420", WatchedCallback);
    //  $rootScope.watchlist = wachlistOffline;

    function calendarCallback(data) {
        $rootScope.Showcalendar = data;

        $scope.today = new Date();
        $scope.calendars = $rootScope.Showcalendar;
        $scope.thisweek = $rootScope.thisweek;

        console.log(JSON.stringify($scope.thisweek));
        $scope.getdate = function (date) {
            var newdate = new Date(date);
            return newdate.getDate();
        }

        var ncal = [];
        for (var i = 0; i < $scope.thisweek.length; i++) {
            var newDate = new Date($scope.thisweek[i]);
            var count = 0;
            var prev = 0;
            var tempArray = [];

            for (var j = 0; j < $scope.calendars.length; j++) {
                var caldate = new Date($scope.calendars[j].first_aired);
                if (newDate.getDate() == caldate.getDate()) {
                    if (prev == caldate.getDate()) {
                        $scope.calendars[j - 1].show = true;
                        tempArray.push($scope.calendars[j - 1]);
                        $scope.calendars[j].show = true;
                        tempArray.push($scope.calendars[j]);
                        count++
                    } else {
                        count++
                    }
                    prev = newDate.getDate();
                }
            }
            if (count > 1) {
                ncal.push(tempArray);
            } else if (count == 1) {
                $scope.calendars[i].show = true;
                ncal.push($scope.calendars[i]);
            } else if (count === 0) {
                ncal.push({ "first_aired": newDate, "show": false });
            }

        }
        $scope.calendars = ncal;
        console.log(ncal);
    }

    //    $scope.weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    // $scope.mode = "week";
    // $scope.showEventDetail = false;


    // var showCalendar = [];
    // for (var i = 0; i < $scope.thisweek.length; i++) {
    //     var mainDate = new Date($scope.thisweek[i]);
    //     var tcount = varCount($scope.calendars, mainDate.getDate());
    //     if (tcount == 0) {
    //         showCalendar.push({ "first_aired": mainDate, "show": false });
    //     }
    //     if (tcount == 1) {
    //         showCalendar.push($scope.calendars[i]);
    //     }
    //     if (tcount > 1) {
    //         var temparrat = [];
    //         for (i = 0; i < tcount; i++) {
    //            // showCalendar.push($scope.calendars[i]);

    //         }
    //     }
    // }

    //console.log(JSON.stringify($scope.calendars[0]));

    //    var temp = { "first_aired": "2017-02-13T02:00:00.000Z", "show": false }

    // var showCalendar = [];
    // for (var i = 0; i < $scope.thisweek.length; i++) {
    //     var mainDate = new Date($scope.thisweek[i]);
    //     var tcount = varCount($scope.calendars, mainDate.getDate());
    //     if (tcount == 0) {
    //         showCalendar.push({ "first_aired": mainDate, "show": false });
    //     }
    //     if (tcount == 1) {
    //         showCalendar.push($scope.calendars[i]);
    //     }
    //     if (tcount > 1) {
    //         var temparrat = [];
    //         for (i = 0; i < tcount; i++) {
    //            // showCalendar.push($scope.calendars[i]);

    //         }
    //     }
    // }
    //console.log(showCalendar);

    // function varCount(array, val) {
    //     var count = 0;
    //     for (var i = 0; i < array.length; i++) {
    //         if (array[i] == val) {
    //             count++;
    //         }
    //     }
    //     return count;
    // }

    // function createRandomEvents() {
    //     var events = [];
    //     for (var i = 0; i < 50; i += 1) {
    //         var date = new Date();
    //         var eventType = Math.floor(Math.random() * 2);
    //         var startDay = Math.floor(Math.random() * 90) - 45;
    //         var endDay = Math.floor(Math.random() * 2) + startDay;
    //         var startTime;
    //         var endTime;
    //         if (eventType === 0) {
    //             startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
    //             if (endDay === startDay) {
    //                 endDay += 1;
    //             }
    //             endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
    //             events.push({
    //                 title: 'All Day - ' + i,
    //                 startTime: startTime,
    //                 endTime: endTime,
    //                 allDay: true
    //             });
    //         } else {
    //             var startMinute = Math.floor(Math.random() * 24 * 60);
    //             var endMinute = Math.floor(Math.random() * 180) + startMinute;
    //             startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
    //             endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
    //             events.push({
    //                 title: 'Event - ' + i,
    //                 startTime: startTime,
    //                 endTime: endTime,
    //                 allDay: false
    //             });
    //         }
    //     }
    //     console.log(events);
    //     return events;
    // }
});