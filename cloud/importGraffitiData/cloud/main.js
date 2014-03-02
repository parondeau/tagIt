Parse.Cloud.define('httpRequest', function(request, response) {
	Parse.Cloud.httpRequest({
		url: 'https://secure.toronto.ca/webwizard/ws/requests.xml?service_code=csrowc-05,csrowbm-03,%20csrosc-14,30102,swlmalb-02&jurisdiction_id=toronto.ca',
		success: function(httpResponse) {
			console.log("FOO");
			console.log(httpResponse.text);
		},
		error: function(httpResponse) {
			console.error('Request failed with response code ' + httpResponse.status);
		}
	});
});