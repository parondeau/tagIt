/*
 *Params
 *num: integer			- number of results to return - defaults to 20
 *set: integer			- set of 'num' results to retrieve. (i.e. allows skipping a previously retrieved set)
 *loc: Parse.GeoPoint	- specify user location for map - defaults to a location in Toronto
 *km: integer			- specify distance from loc over which to find results - defaults to 5
 *
 *Return - Parse.Object extending "Tags" - Empty if query fails
 */
var skip = 0;
function getFeed(num, skip, callback) {
    var Tags = Parse.Object.extend("Tags");
    var query = new Parse.Query(Tags);

    query.limit(num);
    query.skip(skip);
    skip += num;
    query.exists("image");
    query.find({
        success: function (results) {
            callback(null, results);
        },
        error: function (error) {
            callback("error!", error);
        }
    });
}

/*
 *Params
 *num: integer			- number of results to return - defaults to 20
 *loc: Parse.GeoPoint	- specify user location for map - defaults to a location in Toronto
 *km: integer			- specify distance from loc over which to find results - defaults to 5
 *
 *Return - Parse.Object extending "Tags" - Empty if query fails
*/
function getMap(num, loc, km, callback) {
    var Tags = Parse.Object.extend("Tags");
    var query = new Parse.Query(Tags);
    if (!loc) { loc = new Parse.GeoPoint(43.646154, -79.400729); }
    if (!km) { km = 5; }
    if (!num) { num = 20; }

    query.limit(num);
    query.withinKilometers("location", loc, km);
    query.find({
        success: function (results) {
            callback(null, results);
        },
        error: function (error) {
            //iPhone.selfDestruct();
            callback("error!", error);
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
function pushTag(base64Image, loc) {
    if (!base64Image) { return "Error: bad file parameters"; }

    var parseFile = new Parse.File("image.jpg", { base64: base64Image });

    parseFile.save().then(function () {
        var Tags = new Parse.Object.extend("Tags");
        var tag = new Tags();
        tag.set("location", loc);
        tag.set("image", parseFile);
        tag.save(null, {
            success: function(gameScore) {
                removeOverlay();
            },
            error: function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });

    }, function (error) {
        return "Error: File upload failed";
    });
}