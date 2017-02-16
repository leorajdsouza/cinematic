/*
   Show details controller
*/
app.controller('watchlistCtrl', function ($scope, $rootScope, showListService, TraktTVv2, localStore) {
    $rootScope.isLoading = true;
    $scope.error = "";
    function showCallback(data) {
        $scope.watchlists = data;
        $rootScope.isLoading = false;
    }


    //console.log(localStore.get("traktId"));
    if (localStore.get("traktId") == null) {
        $scope.istraktId = true;
        $rootScope.isLoading = false;
    }
    else {
        $rootScope.isLoading = true;
        showListService.getWatchList(showCallback);
    }
    function userfound(data) {
        console.log(data);
        if (data != 404) {
            //localStore.set("traktId", $scope.trakid);
            $scope.istraktId = false;
            $scope.error = "";
            $rootScope.isLoading = true;
            showListService.getWatchList(showCallback);
        } else {
            $scope.error = "Invalid username";
        }
    }

    $scope.saveTrakId = function () {
        if ($scope.trakFrm.trakid.$valid) {
            $scope.error = "";
            TraktTVv2.isValidUser($scope.trakid, userfound);
        } else {
            $scope.error = "Invalid username";
        }
    }

});