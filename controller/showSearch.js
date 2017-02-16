
/*
    Show Search Api
*/
app.controller('headerCtrl', function ($scope, showListService, $rootScope, $location, localStore) {
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

    $scope.istraktId = false;
    if (localStore.get("traktId") != null) {
        $scope.istraktId = false;
        $scope.user = localStore.get("traktId");
    } else {
        $scope.istraktId = true;
    }

    $scope.logout = function () {
        if (confirm("Delete Track.TV username from Cinematic ?")) {
            $scope.user = localStore.remove("traktId");
        }
    }


});