/*
*Params
*num: integer			- number of results to return - defaults to 20
*set: integer			- set of 'num' results to retrieve. (i.e. allows skipping a previously retrieved set)
*ranged: boolean		- specify whether results should be filtered based on proximity
*loc: Parse.GeoPoint	- specify user location for map - defaults to a location in Toronto
*km: integer			- specify distance from loc over which to find results - defaults to 5
*
*Return - probably a Parse.Object, but it's javascript so who knows!? Empty if query fails.
*/
function getFeed(num, set) {
    var Tags = Parse.Object.extend("Tags");
    var query = new Parse.Query(Tags);
    if (!num) { num = 20; }
    if (!set) { set = 0; }

    query.limit(num);
    query.skip(set * num);
    query.find({
        success: function (results) {
            return results;
        },
        error: function (results) {
            //iPhone.selfDestruct();
            return;
        }
    });
}

function getMap(num, loc, km) {
    var Tags = Parse.Object.extend("Tags");
    var query = new Parse.Query(Tags);
    if (!loc) { loc = new Parse.GeoPoint(43.646154, -79.400729); }
    if (!km) { km = 5; }
    if (!num) { num = 20; }

    query.limit(num);
    query.withinKilometers("location", loc, km);
    query.find({
        success: function (results) {
            return results;
        },
        error: function (results) {
            //iPhone.selfDestruct();
            return;
        }
    });
}

/*
*Params
*file: string           - path to file
*name: string           - name of file *with extension*
*loc: Parse.GeoPoint    - location of user
*
*Return - error info or empty if successful
*/
function pushTag(file, name, loc) {
    if (!file || !name) { return "Error: bad file or name parameters"; }
    var parseFile = new Parse.File(name, file);

    parseFile.save().then(function () {
    }, function (error) {
        return "Error: File upload failed";
    });

    var Tags = new Parse.Object.extend("Tags");
    var tag = new Tags();
    tag.set("location", loc);
    tag.set("image", file);
    tag.save();
}