var appConfig = {
    showList: "https://eztvapi.ml/shows",
    showMore: "https://eztvapi.ml/show",
    endPoint: "https://eztvapi.ml"
};

/*
    All Show list 
*/
var app = angular.module('tvApp', ['ngRoute'])
    .controller('tvAppCtrl', function ($scope, showListService, $rootScope) {
        $rootScope.isLoading = true;
        $scope.page_no = 1;
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


    });

/*
    Single show info
*/
app.controller('tvshow', function ($scope, showListService, $routeParams, $rootScope) {
    $rootScope.isLoading = true;
    $scope.showCallback = function (data) {
        $scope.showDataMore = data;
        console.log($scope.showDataMore);
        var old_val = 0;
        angular.forEach($scope.showDataMore, function (ele, index, arr) {


        });

        // $scope.seasons = "";

        $rootScope.isLoading = false;
    }

    showListService.getShow($scope.showCallback, $routeParams.show_id);

    $scope.UnquieShowID = function (id) {

        return true;

    }
});

/*
    Navigation for Shows
*/
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "showList.html"
    }).when("/shows/:show_id", {
        templateUrl: "showInfo.html",
        controller: "tvshow"
    });
});


/*
    Service to load shows list
*/
app.service('showListService', function ($http) {
    this.getShows = function (callback, page_no) {
        $http.get(appConfig.endPoint + "/shows/" + page_no).then(function (response) {
            callback(response.data);
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
});




/*
    Webservice
*/
