/**
 * Trakt TV V2 API interfacing.
 * Throughout the app the API from Trakt.TV is used to fetch content about shows and optionally the user's data
 *
 * For API docs: check here: http://docs.trakt.apiary.io/#
 */
app.factory('TraktTVv2', ["$q", "$http",
    function ($q, $http, $rootScope) {
        var getUrl = function (type, param) {
            if (!isOffline) {
                var out = endpoint + endpoints[type].replace('%s', encodeURIComponent(param));
                return out;
            } else {
                var out = offlineEndpoints[type];
                return out;
            }
        }

        var service = {
            /* what user is following*/
            isValidUser: function (user, callback) {
                $http.get(getUrl("stats", user), {
                    headers: {
                        'trakt-api-key': APIkey,
                        'trakt-api-version': 2,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(function (result) {
                    callback(result.status);
                }, function (err) {
                    callback(err.status);
                });
            },


            /* what user is following*/
            getUserWatchlist: function (user, WatchedCallback) {
                var watchlist = "users/" + user + "/watchlist/shows";

                $http.get(getUrl("watchlist", user), {
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

            getShowCalendar: function (userShows, callback) {
                var curr = new Date;
                var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
                $http.get(getUrl("calendar", firstday), {
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
                            var offset = new Date(result.data[i].first_aired);
                            offset.setDate(offset.getDate() - 1);
                            result.data[i].first_aired = offset;
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