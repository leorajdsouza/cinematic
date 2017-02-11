
/*
To do
------
-move the codes to repective place 
- impliment requires js as it get complex
-dont not remove any comment as comment contains features information
-- impliment state routing
*/

 
var app = angular.module('cinematicApp', ['ngRoute', 'ngSQLite']);

app.constant('DB_CONFIG', {
    follow: {
        id: { type: 'integer' },
        tvdb_id: { type: 'integer' },
        following: { type: 'boolean' }
    }
}).run(function ($SQLite) {
    $SQLite.dbConfig({
        name: 'cinematic-db',
        description: 'cinematic database to store tv shows',
        version: '1.0'
    });
}).run(function ($SQLite, DB_CONFIG) {
    $SQLite.init(function (init) {
        angular.forEach(DB_CONFIG, function (config, name) {
            init.step();
            $SQLite.createTable(name, config).then(init.done);
        });
        init.finish();
    });
}).run(function ($rootScope, $SQLite) {
    var query = "SELECT id,tvdb_id,following FROM follow WHERE following = 1";
    $SQLite.ready(function () {
        $SQLite.selectFirst(query, []).then(
            //no results 
            function () {
                //   deferred.resolve({ status: false });
                //  return deferred.promise;
            },
            //if error
            function (error) {
                //   deferred.reject({ status: false })
            },
            //contains data
            function (data) {
                $rootScope.followData = data.result.rows;
                // console.log($rootScope.followData);
                //  deferred.resolve({ status: false, results: data });
                // return deferred.promise;
            }
        )
        //  });

    });
});
