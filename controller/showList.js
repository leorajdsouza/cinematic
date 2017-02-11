
/*   Show list controller  */
app.controller('listShows', function ($scope, showListService, $rootScope, $location, $window) {

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
        //  console.log(data);
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
        //  console.log($scope.shows);
        $rootScope.isLoading = false;
    }

    showListService.getShows($scope.showsCallback, $scope.page_no);

    $scope.loadShow = function (id) {
        $rootScope.isLoading = true;
        $scope.page_no = id + 1;
        //  console.log($scope.page_no);
        showListService.getShows($scope.loadMore, $scope.page_no);
    }

});

