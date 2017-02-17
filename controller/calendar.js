app.controller('calendarCtrl', function ($scope, $rootScope, TraktTVv2, showListService, localStore) {
    $scope.error = "";
    $rootScope.isLoading = true;

    function calendarCallback(data) {
        $scope.calendars = data;
        $rootScope.isLoading = false;
    }

    $scope.getdate = function (date) {
        var newdate = new Date(date);
        return newdate.getDate();
    }
    $scope.today = new Date();

    $scope.isuser = function () {
        if (localStore.get("traktId") == null) {
            $scope.istraktId = true;
            $rootScope.isLoading = false;
        } else {
            $rootScope.isLoading = true;
            $scope.istraktId = false;
            showListService.getCalendar(calendarCallback);
        }
    }
    $scope.isuser();
    function userfound(data) {
        if (data != 404) {
            localStore.set("traktId", $scope.trakid);
            $scope.istraktId = false;
            $scope.error = "";
            $rootScope.isLoading = false;
            showListService.getCalendar(calendarCallback);
            $scope.$emit('loggedIn', { "logged": true });
        } else {
            $scope.istraktId = false;
            $scope.error = "Invalid username";
        }
    }

    $scope.saveTrakId = function () {
        if ($scope.trakFrm.trakid.$valid) {
            $scope.error = "";
            $rootScope.isLoading = true;
            TraktTVv2.isValidUser($scope.trakid, userfound);
        } else {
            $scope.error = "Invalid username";
        }
    }

    $scope.$on('loggedOut', function (event, args) {
        if (args.out) {
            $scope.isuser();
        }
    });
});