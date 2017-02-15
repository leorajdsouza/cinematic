/**
 * Trakt TV V2 API interfacing.
 * Throughout the app the API from Trakt.TV is used to fetch content about shows and optionally the user's data
 *
 * For API docs: check here: http://docs.trakt.apiary.io/#
 */
app.factory('TraktTVv2', ["$q", "$http",
    function ($q, $http, $rootScope) {

        var APIkey = '39229f5c0530191f27ab06c27c1718cc6a752d05a71b67db8f521cb280942839';
        var endpoint = 'https://api-v2launch.trakt.tv/';

        var endpoints = {
            watchlist: "user/bux420/watchlist/shows",
            calendar: "calendars/all/shows/2017-02-12/7?languages=en&status=returning%20series&countries=us"
        }

        var offlineEndpoints = {
            watchlist: "mockupResponse/offlineWatchList.json",
            calendar: "mockupResponse/offlineCalendar.json"
        }


        var getUrl = function (type) {
            if (!isOffline) {
                var out = endpoint + endpoints[type];
                return out;
            } else {
                var out = offlineEndpoints[type];
                return out;
            }
        }

        var service = {
            /* what user is following*/
            getUserWatchlist: function (user, WatchedCallback) {
                //  var watchlist = "users/" + user + "/watchlist/shows";

                $http.get(getUrl("watchlist"), {
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

            //https://api.trakt.tv/calendars/all/shows/2017-02-12/7?languages=en&status=returning%20series&countries=us
            getShowCalendar: function (userShows, callback) {

                // //get sunday date and send
                //     var calendar = "calendars/all/shows/2017-02-12/7?languages=en&status=returning%20series&countries=us";
                //var date = 2017-02-01;
                //  var duration = 7;
                $http.get(getUrl("calendar"), {
                    headers: {
                        'trakt-api-key': APIkey,
                        'trakt-api-version': 2,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(function (result) {
                    var imdbId = [];
                    angular.forEach(userShows, function (value, key) {
                        imdbId.push(value.imdb);
                    }, imdbId);

                    calendarData = [];
                    for (var i = 0; i < result.data.length; i++) {
                        if (imdbId.indexOf(result.data[i].show.ids.imdb) != -1) {
                            calendarData.push(result.data[i]);

                        }
                    }
                    callback(calendarData);

                }, function (err) {
                    //WatchedCallback(err);
                });


            }

        };

        return service;
    }
]);