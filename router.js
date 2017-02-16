
/*
    Navigation for Shows
*/
app.config(function ($routeProvider) {
    $routeProvider.when("/shows", {
        templateUrl: "view/showList.html",
        controller: "listShows"
    }).when("/shows/:show_id", {
        templateUrl: "view/showDetails.html",
        controller: "showsDetailsCtrl"
    }).when("/search", {
        templateUrl: "view/searchResults.html",
        controller: "headerCtrl"
    }).when("/watchlist", {
        templateUrl: "view/watchlist.html",
        controller: "watchlistCtrl"
    }).when("/calendar", {
        templateUrl: "view/calendar.html",
        controller: "calendarCtrl"
    }).otherwise({ redirectTo: '/shows' });
});
