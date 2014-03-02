function takePicture() {
	navigator.camera.getPicture(takePictureSuccessCallback, takePictureSuccessError, { quality: 50,
		destinationType: Camera.DestinationType.FILE_URI
	});
}

function takePictureSuccessCallback(imageURI) {
	var image = document.getElementById('myImage');
	image.src = imageURI
}

function takePictureSuccessError(message) {
	alert('Failed because: ' + message);
}