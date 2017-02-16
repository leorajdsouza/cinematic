
/*
    Show Search Api
*/
app.controller('headerCtrl', function ($scope, showListService, $rootScope, $location) {
    //check if ur in search page else dont navigate
    // clear search query
    $scope.searchShow = function () {
        if ($scope.search != "" && $scope.search != undefined) {
            $location.path("search");
            showListService.searchShow($scope.searchCallback, $scope.search);
        }

    }

    $scope.searchCallback = function (data) {
        $scope.searchResults = data;
    }

    $scope.isActive = function (route) {
        return route === $location.path();
    }
    //console.log($location.url());
});