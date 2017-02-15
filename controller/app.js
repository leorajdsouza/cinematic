/*
To do
------
- move the codes to repective place 
- impliment requires js as it get complex
- dont not remove any comment as comment contains features information
- impliment state routing
*/


var app = angular.module('cinematicApp', ['ngRoute','ui.rCalendar']);
var db;
// app.constant('DB_CONFIG', {
//     shows: {
//         id: { type: 'integer' },
//         tvdb_id: { type: 'integer' },
//         following: { type: 'boolean' }
//     }
//   })
app.run(function (TraktTVv2, $rootScope) {

    //https://api.trakt.tv/calendars/all/shows/2017-02-12/7?languages=en&status=returning%20series&countries=us
    //offline data

    /* Get this weeks dates*/
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));

    var date = new Date(firstday);
    var day = date.getDay();
    $rootScope.thisweek = []
    for (var i = 0; i < 7; i++) {
        if (i - day != 0) {
            var days = i - day;
            var newDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
            $rootScope.thisweek.push(newDate);
        } else
            $rootScope.thisweek.push(date);
    }




});


// }).run(function ($SQLite, DB_CONFIG) {
//     $SQLite.init(function (init) {
//         angular.forEach(DB_CONFIG, function (config, name) {
//             init.step();
//             $SQLite.createTable(name, config).then(init.done);
//         });
//         init.finish();
//     });
// });



/*.run(function ($rootScope, $SQLite) {
    var query = "SELECT id,tvdb_id,following FROM follow WHERE following = 1";
    $SQLite.ready(function () {
        $SQLite.selectFirst(query, []).then(
            //no results 
            function () {
                //   deferred.resolve({ status: false });
                //  return deferred.promise;
            },
            //if error
            function (error) {
                //   deferred.reject({ status: false })
            },
            //contains data
            function (data) {
                $rootScope.followData = data.result.rows;
                // console.log($rootScope.followData);
                //  deferred.resolve({ status: false, results: data });
                // return deferred.promise;
            }
        )
        //  });

    });
});
*/