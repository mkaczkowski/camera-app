angular.module('sioWebApp.common').factory('cameraService', function($cordovaCamera, notificationService) {
	var cameraService = {};

	cameraService.takePhotoOptions = {
		quality : 100,
		destinationType : Camera.DestinationType.DATA_URL ,
		sourceType : Camera.PictureSourceType.CAMERA ,
		allowEdit : true,
		encodingType: Camera.EncodingType.JPEG,
		saveToPhotoAlbum: false,
		correctOrientation:true
	};

	cameraService.loadImageOptions = {
		quality: 100,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
	};

	cameraService.getPicture = function(dest){
		var canvas = angular.element("#canvas");
		cameraService.takePhotoOptions.targetWidth = canvas.width();
		cameraService.takePhotoOptions.targetHeight = canvas.height();

		$cordovaCamera.getPicture(cameraService.takePhotoOptions).then(function(imageData){
					console.log("cameraService.getPicture2 success:"+imageData)
					var image = document.getElementById(dest);
					image.src = "data:image/jpeg;base64," + imageData
				}, function(err) {
					console.error("error!!:"+err)
					notificationService.showError("Ooops. Something went wrong.")
				}
		)
	};

	cameraService.loadImageFromLibrary = function(dest) {
		var canvas = angular.element("#canvas");
		cameraService.loadImageOptions.targetWidth = canvas.width();
		cameraService.loadImageOptions.targetHeight = canvas.height();

		$cordovaCamera.getPicture(cameraService.loadImageOptions).then(function (imageData) {
			console.info("loadImageFromLibrary imageURI:" + imageData);
			var largeImage = document.getElementById(dest);
			largeImage.style.display = 'block';
			largeImage.src = imageData;
		}, function (err) {
			console.error("error!!:" + err)
			notificationService.showError("Ooops. Something went wrong.")
		})
	};
	return cameraService;
});