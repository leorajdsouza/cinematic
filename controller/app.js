
var appConfig = { 
    endPoint: "https://api-fetch.website/tv/"
};

/*
    All Show list 
*/

var app = angular.module('tvApp', ['ngRoute']);
app.controller('tvAppCtrl', function ($scope, showListService, $rootScope, $location, $window) {
    $rootScope.isLoading = true;
    $scope.page_no = 1;
    $scope.search = ""; 

    /*
    Load show total count for Navigation
    */
    $scope.showCountCallback = function (data) {
        $scope.showCount = data;
    }
    $scope.showCount = showListService.showCount($scope.showCountCallback);

    /* Get tv shows */
    $scope.showsCallback = function (data) {
        console.log(data);
        //   window.scrollTo(0, 0);
        if (!data.length <= 0) {
            $scope.shows = [];
            $scope.shows = data;
        } else {
            alert("Shows not available")
        }
        $rootScope.isLoading = false;
    }

    $scope.loadMore = function (data) { 
        $scope.shows = $scope.shows.concat(data);
        console.log($scope.shows);
        $rootScope.isLoading = false;
    }

    showListService.getShows($scope.showsCallback, $scope.page_no);

    $scope.loadShow = function (id) {
        $rootScope.isLoading = true;
        $scope.page_no = id + 1;
        console.log($scope.page_no);
        showListService.getShows($scope.loadMore, $scope.page_no);
    }

    $scope.searchCallback = function (data) {
        $rootScope.searchResults = data;
        $location.path("search");
        // console.log($scope.searchResults);
    }

    $scope.searchShow = function () {
        if (!$scope.search == undefined || !$scope.search == "") {
            showListService.searchShow($scope.searchCallback, $scope.search);
        }
    }

});

/*
    Single show info
*/
app.controller('tvshow', function ($scope, showListService, $routeParams, $rootScope) {
    $rootScope.isLoading = true;
    $scope.episodes = [];
    $scope.showCallback = function (data) {

        $scope.showDataMore = data;
        $scope.episodes = $scope.showDataMore.episodes;
        $scope.seasonDups();
        $rootScope.isLoading = false;
    }
    $scope.seasonDups = function () {
        $scope.seasonCount = [];
        for (var i = 0; i < $scope.episodes.length; i++) {
            if ($scope.seasonCount.indexOf($scope.episodes[i].season) == - 1) {
                $scope.seasonCount.push($scope.episodes[i].season);
            }
        }
 
    }

 
    showListService.getShow($scope.showCallback, $routeParams.show_id);
    $scope.UnquieShowID = function (id) {
        return true;
    }

    $scope.openTorrent = function (magnet) {
        window.location.replace(magnet);
    }
});

/*
    Navigation for Shows
*/
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "view/showList.html",
        controller: "tvAppCtrl"
    }).when("/shows/:show_id", {
        templateUrl: "view/showInfo.html",
        controller: "tvshow"
    }).when("/search", {
        templateUrl: "view/searchResults.html",
        //controller: "tvAppCtrl"
    });
});

/*
    Service to load shows list
*/
app.service('showListService', function ($http) {
    this.getShows = function (callback, page_no) {
        $http.get(appConfig.endPoint + "/shows/" + page_no).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                callback(response.data);
            }

        });
    }
    this.getShow = function (callback, show_id) {
        $http.get(appConfig.endPoint + '/show/' + show_id).then(function (response) {
            callback(response.data);
        });
    }
    this.showCount = function (callback) {
        $http.get(appConfig.endPoint + '/shows/').then(function (response) {
            callback(response.data);
        });
    }
    this.searchShow = function (callback, search) {
        $http.get(appConfig.endPoint + '/shows/1?keywords=' + search).then(function (response) {
            callback(response.data);
        });
    }
});



/*
    Webservice
*/
