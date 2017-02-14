
/*
    Navigation for Shows
*/
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "view/showList.html",
        controller: "listShows"
    }).when("/shows/:show_id", {
        templateUrl: "view/showDetails.html",
        controller: "showsDetailsCtrl"
    }).when("/search", {
        templateUrl: "view/searchResults.html",
        controller: "showSearchCtrl"
    }).when("/watchlist", {
        templateUrl: "view/watchlist.html",
        controller: "watchlistCtrl"
    }).when("/calendar", {
        templateUrl: "view/calendar.html",
        controller: "calendarCtrl"
    });
});
