var appConfig = {
    showList: "https://eztvapi.ml/shows",
    showMore: "https://eztvapi.ml/show",
    endPoint: "https://eztvapi.ml"
};

/*
    All Show list 
*/

var app = angular.module('tvApp', ['ngRoute']);
app.controller('tvAppCtrl', function ($scope, showListService, $rootScope, $location) {
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

    $scope.showsCallback = function (data) {
        window.scrollTo(0, 0);
        if (!data.length <= 0) {
            $scope.shows = data;
        } else {
            alert("Shows not available")
        }
        $rootScope.isLoading = false;
    }
    showListService.getShows($scope.showsCallback, $scope.page_no);

    $scope.loadShow = function (urlId) {
        $rootScope.isLoading = true;
        $scope.page_no = urlId.split("/")[1];
        showListService.getShows($scope.showsCallback, $scope.page_no);
    }

    $scope.searchCallback = function (data) {
        $rootScope.searchResults = data;
        $location.path("search");
        console.log($scope.searchResults);
    }

    $scope.searchShow = function () {
        if (!$scope.search == undefined || !$scope.search == "") {
            showListService.searchShow($scope.searchCallback, $scope.search);
        }
    }

});

app.run(function ($rootScope) {

});

/*
    Single show info
*/
app.controller('tvshow', function ($scope, showListService, $routeParams, $rootScope) {
    $rootScope.isLoading = true;
    $scope.showCallback = function (data) {
        $scope.showDataMore = data;
        console.log($scope.showDataMore);
        $rootScope.isLoading = false;
    }

    showListService.getShow($scope.showCallback, $routeParams.show_id);
    $scope.UnquieShowID = function (id) {
        return true;
    }

    $scope.openTorrent = function (magnet) {
        alert(magnet);
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
        controller: "tvAppCtrl"
    });
});


/*
    Service to load shows list
*/
app.service('showListService', function ($http) {
    this.getShows = function (callback, page_no) {
        $http.get({method: 'JSONP', url: appConfig.endPoint + "/shows/" + page_no    }).then(function (response) {
            callback(response.data);
        });
    }
    this.getShow = function (callback, show_id) {
        $http.get({method: 'JSONP', url: appConfig.endPoint + '/show/' + show_id}).then(function (response) {
            callback(response.data);
        });
    }
    this.showCount = function (callback) {
        $http.get({method: 'JSONP', url: appConfig.endPoint + '/shows/'}).then(function (response) {
            callback(response.data);
        });
    }
    this.searchShow = function (callback, search) {
        $http.get({method: 'JSONP', url: appConfig.endPoint + '/shows/1?keywords=' + search}).then(function (response) {
            callback(response.data);
        });
    }
});



/*
    Webservice
*/
