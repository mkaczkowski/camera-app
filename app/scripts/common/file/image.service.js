angular.module('sioWebApp.common').factory('imageService', function() {
    var imageService = {};

    imageService.saveCanvasToFile = function(canvas, successHandler, faultHandler) {
        if(!window.canvas2ImagePlugin) {
            faultHandler()
            return;
        }

        window.canvas2ImagePlugin.saveImageDataToLibrary(successHandler,faultHandler,canvas);
    };
	
	 imageService.setWallpaper = function(imagePath,successHandler, faultHandler) {
       // prep some variables
		  var imageTitle = "christmas";                     // Set title of your choice.
		  var folderName = "PluginImages";                  // Set folder Name of your choice. 
		  
		  imagePath = "www/img/christmas.jpeg";             // Mention the complete path to your image. If it contains under multiple folder then mention the path from level "www" to the level your image contains with its name including its extension.

		  // For setting wallpaper & saving image
		  wallpaper.setImage(imagePath, imageTitle, folderName, successHandler, faultHandler);

		  // For saving image
		//  wallpaper.saveImage(imagePath, imageTitle, folderName, success, error);     
    };

    return imageService;
});