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
    $scope.isExpanded = true;

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
        mySharedService.moveUp();
    };

    $scope.moveDown = function(){
        mySharedService.moveDown();
    };

    $scope.mirror = function(){
        mySharedService.mirror();
    };

    $scope.hideToolbar = function(){
        //mySharedService.prepForBroadcast(null);
        $scope.isExpanded = false;
    };

    $scope.showToolbar = function(){
        //mySharedService.prepForBroadcast(null);
        $scope.isExpanded = true;
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
                                notificationService.savedConfirm(msg,
                                    function (path) {$scope.sharePicure(path)});
                            }
                        },function(err){
                            hide();
                            console.log("saveCanvasToFile err:"+err)
                            notificationService.showError("Ooops. Something went wrong.")
                        });
                }
            });
        },500);
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
