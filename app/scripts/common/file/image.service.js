angular.module('sioWebApp.common').factory('imageService', function() {
    var imageService = {};

    imageService.saveCanvasToFile = function(canvas, successHandler, faultHandler) {
        if(!window.canvas2ImagePlugin) {
            faultHandler()
            return;
        }

        window.canvas2ImagePlugin.saveImageDataToLibrary(successHandler,faultHandler,canvas);
    };

    return imageService;
});