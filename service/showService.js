
/*
    Service to load shows list
*/
app.service('showListService', function ($http) {
    this.getShows = function (callback, page_no) {
        $http.get(appConfig.endPoint + "/shows/" + page_no).then(function (response) {
            //  console.log(response);
            if (response.status == 200) {
                callback(response.data);
            }

        });
    }
    this.getShow = function (callback, show_id) {
        $http.get(appConfig.endPoint + '/show/' + show_id + "?" + Math.random(1, 1000)
        ).then(function (response) {
            callback(response.data);
        });
    }

    this.searchShow = function (callback, search) {
        $http.get(appConfig.endPoint + '/shows/1?keywords=' + search).then(function (response) {
            callback(response.data);
        });
    }
});
