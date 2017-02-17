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
    $scope.isUser = function () {
        if (localStore.get("traktId") == null) {
            $scope.istraktId = true;
            $rootScope.isLoading = false;
        } else {
            $rootScope.isLoading = true;
            $scope.istraktId = false;
            showListService.getWatchList(showCallback);
        }
    }
    $scope.isUser();

    function userfound(data) {
        if (data != 404) {
            localStore.set("traktId", $scope.trakid);
            $scope.istraktId = false;
            $scope.error = "";
            $rootScope.isLoading = false;
            showListService.getWatchList(showCallback);
            $scope.$emit('loggedIn', { "logged": true });
        } else {
            $scope.error = "Invalid username";
            $rootScope.isLoading = false;
        }
    }

    $scope.$on('loggedOut', function (event, args) {
        if (args.out) {
            $scope.isUser();
        }
    });

    $scope.saveTrakId = function () {
        if ($scope.trakFrm.trakid.$valid) {
            $rootScope.isLoading = true;
            $scope.error = "";
            TraktTVv2.isValidUser($scope.trakid, userfound);
        } else {
            $scope.error = "Invalid username";
        }
    }

});