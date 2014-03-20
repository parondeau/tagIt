function mapInitialize() {
	var mapOptions = {
		center: new google.maps.LatLng(43.646467, -79.400646),
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
			mapOptions);

	getMap(40, null, 100, function(err, results) {
		if (err) {
			console.log(err);
		} else {
			results.forEach(function(result) {
				// console.log(result.attributes.location._longitude);

				var marker = new google.maps.Marker({
				    position: new google.maps.LatLng(result.attributes.location._longitude, result.attributes.location._latitude),
				    title:"Hello World!"
				});

				// To add the marker to the map, call setMap();
				marker.setMap(map);
			});
		}
	});
}


google.maps.event.addDomListener(window, 'load', mapInitialize);