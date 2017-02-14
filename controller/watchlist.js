/*
   Show details controller
*/
app.controller('watchlistCtrl', function ($scope,$rootScope) {

    $scope.watchlist = $rootScope.watchlist;
    //console.log( $scope.watchlist );

});