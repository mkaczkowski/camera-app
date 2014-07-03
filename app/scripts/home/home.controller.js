'use strict';

/**
 * @ngdoc function
 * @name sioWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sioWebApp
 */
angular.module('sioWebApp.home').controller('HomeCtrl', function ($scope, $ionicPopup,$ionicLoading, $timeout,
                                                                  imageService, cameraService, mySharedService,
                                                                  sharingService, notificationService, networkService,
                                                                  configuration) {

    var loading;
    var show = function() { loading = $ionicLoading.show({ content: 'Processing...' }); };
    var hide = function(){ if(!loading) return; loading.hide(); };

    $scope.isEmpty = true;
    $scope.isSelected = false;

    /*$scope.$watch(mySharedService.message, function() {
     console.info("watch:"+mySharedService.message);
     $scope.isSelected = mySharedService.message;
     }, true);*/

    $scope.$on('handleBroadcast', function() {
        $scope.isSelected = mySharedService.message;
        if(mySharedService.message){
            $scope.isEmpty = false;
        }
    });

    $scope.resetElement = function(){
        console.log("resetElement");
        mySharedService.resetElement();
    };

    $scope.removeElement = function(){
        console.log("remove Element");
        mySharedService.removeElement();
        $scope.isEmpty = (angular.element(".drag-and-drop").length == 0);
    };

    $scope.moveUp = function(){
        console.log("up");
        mySharedService.moveUp();
    };

    $scope.moveDown = function(){
        console.log("down");
        mySharedService.moveDown();
    };

    $scope.hideToolbar = function(){
        //$scope.isSelected=false;
        mySharedService.prepForBroadcast(null);
    };

    $scope.saveCanvasToFile = function(successHandler){
        show();
        mySharedService.prepForBroadcast(null);
        $timeout(function(){
            html2canvas( [ document.getElementById('draggableContainer') ], {
                onrendered: function(canvas) {
                    imageService.saveCanvasToFile(canvas,
                        function(msg){
                            hide();
                            if(successHandler){
                                successHandler(msg)
                            }else{
                                notificationService.showInfo("Picture is saved!")
                            }
                        },function(err){
                            hide();
                            console.log("saveCanvasToFile err:"+err)
                            notificationService.showError("Sorry, there was an error :(")
                        });
                }
            });
        },2000);
    };

    $scope.sharePicure = function(){
        $scope.saveCanvasToFile(function(filePath){
            sharingService.shareViaFacebook(filePath);
        });
    };

    $scope.getPicture = function(){
        cameraService.takePicture("pictureImg");
    };

    $scope.clearWhiteboard = function(){
        notificationService.confirm('Are you sure you want to clear?',
            function() {
                mySharedService.clearAll();
                $scope.isEmpty = true;
            });
    };

    mySharedService.init();
});
