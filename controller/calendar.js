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

    if (localStore.get("traktId") == null) {
        $scope.istraktId = true;
        $rootScope.isLoading = false;
    } else {
        $rootScope.isLoading = true;
        $scope.istraktId = false;
        showListService.getCalendar(calendarCallback);
    }
    function userfound(data) {
        console.log(data);
        if (data != 404) {
            localStore.set("traktId", $scope.trakid);
            $scope.istraktId = false;
            $scope.error = "";
            $rootScope.isLoading = true;
            showListService.getCalendar(calendarCallback);
        } else {
            $scope.istraktId = false;
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