/**
 * Trakt TV V2 API interfacing.
 * Throughout the app the API from Trakt.TV is used to fetch content about shows and optionally the user's data
 *
 * For API docs: check here: http://docs.trakt.apiary.io/#
 */
app.factory('TraktTVv2', ["$q", "$http",
    function ($q, $http) {

        var APIkey = '39229f5c0530191f27ab06c27c1718cc6a752d05a71b67db8f521cb280942839';
        var endpoint = 'https://api-v2launch.trakt.tv/';


        var service = {
            /* what user is following*/
            getUserWatchlist: function (user, WatchedCallback) {
                var watchlist = "users/" + user + "/watchlist/shows";

                $http.get(endpoint + watchlist, {
                    headers: {
                        'trakt-api-key': APIkey,
                        'trakt-api-version': 2,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(function (result) {
                    WatchedCallback(result.data);
                }, function (err) {
                    WatchedCallback(err);
                });
            },

            getShowCalendar: function (date) {
               
                //get sunday date and send
                var calendar = "calendars/all/shows/";
                //var date = 2017-02-01;
                var duration = 7;

                $http.get(endpoint + calendar+date+"/"+duration, {
                    headers: {
                        'trakt-api-key': APIkey,
                        'trakt-api-version': 2,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(function (result) {
                    console.log(result.data);
                    //WatchedCallback(result.data);
                }, function (err) {
                    //WatchedCallback(err);
                });

            }

        };

        return service;
    }
]);