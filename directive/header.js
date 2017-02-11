
app.directive('header', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "view/header.html",
        controller: 'showSearchCtrl'
    }
});