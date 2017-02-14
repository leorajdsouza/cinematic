/*
To do
------
- move the codes to repective place 
- impliment requires js as it get complex
- dont not remove any comment as comment contains features information
- impliment state routing
*/
var wachlistOffline = [{
    "trakt": 1409,
    "slug": "the-big-bang-theory",
    "tvdb": 80379,
    "imdb": "tt0898266",
    "tmdb": 1418,
    "tvrage": 8511
}, {
    "trakt": 1403,
    "slug": "arrow",
    "tvdb": 257655,
    "imdb": "tt2193021",
    "tmdb": 1412,
    "tvrage": 30715
}, {
    "trakt": 1394,
    "slug": "marvel-s-agents-of-s-h-i-e-l-d",
    "tvdb": 263365,
    "imdb": "tt2364582",
    "tmdb": 1403,
    "tvrage": 32656
}, {
    "trakt": 1393,
    "slug": "the-walking-dead",
    "tvdb": 153021,
    "imdb": "tt1520211",
    "tmdb": 1402,
    "tvrage": 25056
}, {
    "trakt": 60300,
    "slug": "the-flash-2014",
    "tvdb": 279121,
    "imdb": "tt3107288",
    "tmdb": 60735,
    "tvrage": 36939
}, {
    "trakt": 1390,
    "slug": "game-of-thrones",
    "tvdb": 121361,
    "imdb": "tt0944947",
    "tmdb": 1399,
    "tvrage": 24493
}, {
    "trakt": 1611,
    "slug": "supernatural",
    "tvdb": 78901,
    "imdb": "tt0460681",
    "tmdb": 1622,
    "tvrage": 5410
}, {
    "trakt": 19792,
    "slug": "sherlock",
    "tvdb": 176941,
    "imdb": "tt1475582",
    "tmdb": 19885,
    "tvrage": 23433
}]


var app = angular.module('cinematicApp', ['ngRoute']);
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


    var watchlist = [];

    function WatchedCallback(data) {
        angular.forEach(data, function (value, key) {
            watchlist.push(value.show.ids);
        }, watchlist);
        $rootScope.watchlist = watchlist;
        TraktTVv2.getShowCalendar($rootScope.watchlist,calendarCallback);
    }

    TraktTVv2.getUserWatchlist("bux420", WatchedCallback);
    //  $rootScope.watchlist = wachlistOffline;

    function calendarCallback(data) {
        $rootScope.Showcalendar = data; 
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