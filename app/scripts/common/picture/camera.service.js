angular.module('sioWebApp.common').factory('cameraService', function(cordovaCamera) {
	var cameraService = {};

	cameraService.takePicture = function(dest) {

		var options = {
			quality : 50,
			destinationType : Camera.DestinationType.DATA_URL ,
			sourceType : Camera.PictureSourceType.CAMERA ,
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 100,
			targetHeight: 100,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};

		navigator.camera.getPicture(function(imageData) {
			var image = document.getElementById(dest);
			image.src = "data:image/jpeg;base64," + imageData
		}, function(err) {
			console.error("error!!:"+err)
		}, options);

	};
	return cameraService;
});