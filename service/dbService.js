/* 
    Sql service
*/


// app.service('showDB', function (pouchDB) {

//     this.insertToDb = function (data) {
       
//         db.put(data).then(function (response) {
//             // handle response
//         }).catch(function (err) {
//             console.log(err);
//         });
//     }
// });


// app.service("dbQuery", function ($SQLite, $q, $http) {
//     var deferred = $q.defer();

//     this.loadToDB = function (data) {
//         $SQLite.ready(function () {
//             this.insert('shows', data).then(onSuccess, onError);
//         });

//         function onSuccess(data) {
//             console.log("Your now following..");
//         }

//         function onError(error) {
//             console.log("ESrror" + JSON.stringify(error));
//         }
//     }



//     this.insert = function (query) {
//         if (query.following) {
//             $SQLite.ready(function () {
//                 this.insert('shows', query).then(onSuccess, onError);
//             });
//         }

//         function onSuccess(data) {
//             console.log("Your now following..");
//         }

//         function onError(error) {
//             console.log("Error" + JSON.stringify(error));
//         }
//     };


// this.select = function (query) {
//     //   $SQLite.ready(function () {
//     return $SQLite.selectFirst(query, []).then(
//         //no results 
//         function () {
//             deferred.resolve({ status: false });
//             return deferred.promise;
//         },
//         //if error
//         function (error) {
//             deferred.reject({ status: false })
//         },
//         //contains data
//         function (data) {
//             console.log(data);
//             deferred.resolve({ status: false, results: data });
//             return deferred.promise;
//         }
//     )
//     //  });
// };


//});