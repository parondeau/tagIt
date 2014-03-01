/*
*Params
*num: integer			- number of results to return - defaults to 20
*set: integer			- set of 'num' results to retrieve. (i.e. allows skipping a previously retrieved set)
*ranged: boolean		- specify whether results should be filtered based on proximity
*loc: Parse.GeoPoint	- specify user location for map - defaults to a location in Toronto
*km: integer			- specify distance from loc over which to find results - defaults to 5
*/
function getTags(num, set, ranged, loc, km){
	var Tags = Parse.Object.extend("Tags");
	var query = new Parse.Query.(Tags);
	if (!num){num = 20;}
	query.limit(num);

	if (ranged){
		if (!loc){loc = new Parse.GeoPoint(43.646154, -79.400729);}
		if (!km){km = 5;}
		query.withinKilometers("location", loc, km);
	}
	else
	{
		if (!set){set = 0;}
		query.skip(set * num);
	}
	
	query.find({
		success: function(results){
			return results;
		},
		error: function(results){
			//iPhone.selfDestruct();
		}
	});
}