/*
    Service to load shows list
*/
app.service('showListService', function ($http, TraktTVv2, localStore) {
    this.getShows = function (callback, page_no) {
        $http.get(appConfig.endPoint + "shows/" + page_no).then(function (response) {
            //  console.log(response);
            if (response.status == 200) {
                callback(response.data);
            }

        });
    }
    this.getShow = function (callback, show_id) {
        $http.get(appConfig.endPoint + 'show/' + show_id + "?" + Math.random(1, 1000)).then(function (response) {
            callback(response.data);
        });
    }

    this.searchShow = function (callback, search) {
        $http.get(appConfig.endPoint + 'shows/1?keywords=' + search).then(function (response) {
            callback(response.data);
        });
    }

    this.getWatchList = function (callback) {
        var user = localStore.get("traktId");
        TraktTVv2.getUserWatchlist(user, function (data) {
            var watchlist = [];

            angular.forEach(data, function (value, key) {
                value.show.ids.title = value.show.title;
                value.show.ids.year = value.show.year;
                watchlist.push(value.show.ids);
            }, watchlist);

            callback(watchlist);
        });

    }
    this.getCalendar = function (callback) {
        this.getWatchList(function (data) {
            TraktTVv2.getShowCalendar(data, callback);
        });

    }
});