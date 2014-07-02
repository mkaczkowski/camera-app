angular.module('sioWebApp.common').controller('SharingCtrl', function($scope, $cordovaSocialSharing) {

	var test = function(){
		$cordovaSocialSharing.shareViaTwitter(message, image, link).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		$cordovaSocialSharing.shareViaWhatsApp(message, image, link).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		$cordovaSocialSharing.shareViaFacebook(message, image, link).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});

		// access multiple numbers in a string like: '0612345678,0687654321'
		$cordovaSocialSharing.shareViaSMS(message, number).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});

		// TO, CC, BCC must be an array, Files can be either null, string or array
		$cordovaSocialSharing.shareViaEmail(message, subject, toArr, bccArr, file).then(
				function(result) {
					// Success!
				}, function(err) {
					// An error occured. Show a message to the user
				});


		$cordovaSocialSharing.canShareVia(socialType, message, image, link).then(
				function(result) {
					// Success!
				}, function(err) {
					// An error occured. Show a message to the user
				});
	}
});
