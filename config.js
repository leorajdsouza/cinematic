
// For test only - To get mockup respnose
var isOffline = true;

var appConfig = {
    endPoint: "https://api-fetch.website/tv/"
};
var APIkey = '39229f5c0530191f27ab06c27c1718cc6a752d05a71b67db8f521cb280942839';
var endpoint = 'https://api-v2launch.trakt.tv/';

var endpoints = {
    watchlist: "user/%s/watchlist/shows",
    calendar: "calendars/all/shows/%s/7?languages=en&status=returning%20series&countries=us",
    stats: "https://api.trakt.tv/users/%s/stats"
}

var offlineEndpoints = {
    watchlist: "mockupResponse/offlineWatchList.json",
    calendar: "mockupResponse/offlineCalendar.json",
    stats: "mockupResponse/offlinestats.json"
}


//future alernative config url , if any api downtime 
// ----------TV API's----------
// https://popcorntimece.ch/api/v2
// https://tv.koashiko.xyz - (shut down)
// https://popcornwvnbg7jev.onion.to
// https://eztvapi.re
// https://popcorntimece.ch/api/eztv/
// https://popcorntime.ws/api/eztv/
// https://api-fetch.website/tv/
// https://ptapitsxaabevfvk.onion.to
// https://eztvapi.ml/


// --------Movies API's--------
// https://movies.api-fetch.website/
// https://yts.popcorntimece.ch/
// https://yts.ag/