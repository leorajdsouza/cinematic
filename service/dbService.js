
/* local Storage*/
app.factory("localStore", function () {
    return {
        set: function (key, val) {
            localStorage.setItem(key, val);
            console.log("stored to local storage");
        },
        get: function (key) {
            return localStorage.getItem("key");
        }
    }
});
