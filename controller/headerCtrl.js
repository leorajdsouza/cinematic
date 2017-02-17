
/*
    Show Search Api
*/
app.controller('headerCtrl', function ($scope, showListService, $rootScope, $location, localStore) {
    //check if ur in search page else dont navigate
    // clear search query 
    $scope.searchShow = function () {
        if ($scope.search != "" && $scope.search != undefined) {
            $location.path("search");
            $rootScope.isLoading = true;
            showListService.searchShow($scope.searchCallback, $scope.search);
        }
    }

    $scope.searchCallback = function (data) {
        $scope.searchResults = data;
        $rootScope.isLoading = false;
    }

    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $scope.istraktId = false;
    checkForUser();
    function checkForUser() {
        if (localStore.get("traktId") != null) {
            $scope.istraktId = true;
            $scope.user = localStore.get("traktId");
        } else {
            $scope.istraktId = false;
        }
    }

    $scope.logout = function () {
        var optn = confirm("Delete Track.TV ID from Cinematic ?") 
        if (optn) {
            $scope.user = localStore.remove("traktId");
            $scope.istraktId = false;
            $scope.$broadcast('loggedOut', { "out": true });
        }



    }
    $scope.$on('loggedIn', function (event, args) {
        checkForUser();
    });


});