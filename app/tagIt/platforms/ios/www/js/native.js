function takePicture() {
	navigator.camera.getPicture(takePictureSuccessCallback, takePictureSuccessError, { quality: 50,
		destinationType: Camera.DestinationType.FILE_URI
	});
}

function takePictureSuccessCallback(imageURI) {
	var url = "url('" + imageURI + "')";
	$('#cameraImageUnderlay').css('background-image', url);
	addOverlay();
}

function takePictureSuccessError(message) {
	alert('Failed because: ' + message);
}