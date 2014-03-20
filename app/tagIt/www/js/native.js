function takePicture() {
	navigator.camera.getPicture(takePictureSuccessCallback, takePictureError, {
		quality: 0,
		cameraDirection: Camera.Direction.BACK,
		correctOrientation: true,
		destinationType: Camera.DestinationType.DATA_URL,
		encodingType: Camera.EncodingType.JPEG,
	});
}
var imageData;
var self = this;
function takePictureSuccessCallback(imageData) {
	self.imageData = imageData
	var url = "url('" +  "data:image/jpeg;base64," + imageData + "')";
	$('#cameraImageUnderlay').css('background-image', url);
	addOverlay();
}


function takePictureError(message) {
	alert('Failed because: ' + message);
}