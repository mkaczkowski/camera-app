angular.module('sioWebApp.common').factory('cameraService', function($cordovaCamera, notificationService) {
    var cameraService = {};

    cameraService.options = {
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

    cameraService.getPicture2 = function(dest){
        $cordovaCamera.getPicture(cameraService.options).then(function(imageData){
                var image = document.getElementById(dest);
                image.src = "data:image/jpeg;base64," + imageData
            }, function(err) {
                console.error("error!!:"+err)
                notificationService.showError("Sorry, there was an error :(")
            }
        )
    }

    cameraService.takePicture = function(dest) {
        navigator.camera.getPicture(function(imageData) {
            var image = document.getElementById(dest);
            image.src = "data:image/jpeg;base64," + imageData
        }, function(err) {
            notificationService.showError("Sorry, there was an error :(")
            console.error("error!!:"+err)
        }, cameraService.options);

    };
    return cameraService;
});