/*
   Show details controller
*/
app.controller('showsDetailsCtrl', function ($scope, showListService, $routeParams, $q, $rootScope) {

    $rootScope.isLoading = true;
    $scope.episodes = [];
    $scope.showCallback = function (data) {
        $scope.showDataMore = data;
        $scope.episodes = $scope.showDataMore.episodes;
        $scope.seasonDups();
        $rootScope.isLoading = false;
        // $scope.followShows = [];
        $scope.isFollow = false;
 
        for (var i = 0; i < $rootScope.watchlist.length; i++) { 
            if (!$scope.isFollow) { 
                if ($rootScope.watchlist[i].tvdb == $scope.showDataMore.tvdb_id) { 
                    $scope.isFollow = true;
                }
            }
        } 

        //for db row to ng repeat
        // for (var i = 0; i < $rootScope.followData.length; i++) {
        //     console.log($rootScope.followData.item(i));
        //     $scope.followShows.push($rootScope.followData.item(i));
        //     // if (!$scope.isFollow) {
        //     //     if ($rootScope.followData.item(i).tvdb_id == $scope.showDataMore.tvdb_id) {
        //     //         $scope.isFollow = true;
        //     //     }
        //     // }
        // }
    }

    /*Remove duplicate season values*/
    $scope.seasonDups = function () {
        $scope.seasonCount = [];
        for (var i = 0; i < $scope.episodes.length; i++) {
            if ($scope.seasonCount.indexOf($scope.episodes[i].season) == -1) {
                $scope.seasonCount.push($scope.episodes[i].season);
            }
        }
        $scope.seasonCount = $scope.seasonCount.sort(compareNumbers).reverse();
        // console.log($scope.seasonCount);
        $scope.selectedSeason = $scope.seasonCount[0].toString();
    }


    function compareNumbers(a, b) {
        return a - b;
    }

    showListService.getShow($scope.showCallback, $routeParams.show_id);
    $scope.UnquieShowID = function (id) {
        return true;
    }

    $scope.openTorrent = function (magnet) {
        window.location.replace(magnet);
        /* send toast notification to user saying torrent has been added. e.g mac */
        // code goes here 
    }
    // $scope.follow = function (id, tvdb_id, follow) {
    //     $scope.isFollow = !follow;
    //     var data = {
    //         id: id,
    //         tvdb_id: tvdb_id,
    //         following: !follow
    //     } 
    // }

});