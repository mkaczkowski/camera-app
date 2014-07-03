angular.module('sioWebApp.common').factory('sharingService', function(configuration, $cordovaSocialSharing, notificationService) {
    var shareService = {};

    shareService.shareViaFacebook = function(image) {
        var link = configuration.url;
        var message = "Magic Camera APP";
        $cordovaSocialSharing.shareViaFacebook(message, image, link).then(function(result) {
            console.log("shareViaFacebook success! :"+result);
        }, function(err) {
            console.log("shareViaFacebook err:"+err);
            notificationService.showError("Sorry, there was an error :(")
        });
    };

    return shareService;
});

