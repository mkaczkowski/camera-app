'use strict';

/**
 * @ngdoc function
 * @name sioWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sioWebApp
 */
angular.module('sioWebApp.home').controller('HomeCtrl', function ($scope, $ionicPopup,$ionicLoading, $timeout, imageService, cameraService, mySharedService) {

    var loading;
    var show = function() {
        loading = $ionicLoading.show({
            content: 'Processing...'
        });
    };

    var hide = function(){
        if(!loading) return;
        loading.hide();
    };

    $scope.saveCanvasToFile = function(){
        show();
        mySharedService.prepForBroadcast(null);
        $timeout(function(){
            html2canvas( [ document.getElementById('draggableContainer') ], {
                onrendered: function(canvas) {
                    imageService.saveCanvasToFile(canvas,
                        function(msg){
                            console.log(msg);
                            hide();
                        },function(err){
                            console.log(err);
                            hide();
                        });
                    //document.getElementById('debugPanel').appendChild(canvas);
                }
            });
        },2000);
        //$ionicLoading.hide();
    };

    $scope.getPicture = function(){
        cameraService.takePicture("pictureImg");
    };

    $scope.clearWhiteboard = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure you want to clear?',
            okType: 'button-energized'
        });
        confirmPopup.then(function(res) {
            if(res) {
                mySharedService.clearAll();
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: 'It might taste good'
        });
        alertPopup.then(function(res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    };
});
