angular.module('sioWebApp.common').factory('notificationService', function($cordovaDialogs, $ionicPopup, $timeout) {
    var notificationService = {};

    //$cordovaDialogs.alert('Wow!');
    //$cordovaDialogs.confirm('Are you sure?');
    //$cordovaDialogs.prompt('Please Login');
    // beep 3 times $cordovaDialogs.beep(3);

    notificationService.showError = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: msg,
            okType: 'button-assertive'
        });
        alertPopup.then(function(res) {
            console.log('showAlert closed.');
        });
    };

    notificationService.showSavedInfo = function(scope, imgPath) {

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            //template: '<input>',//'<img src="data/images/misc1.png"/>',//'<img src="'+imgPath+'">',
            template: '<div>dasda a das</div>',
            scope: scope,
            title: 'Enter Wi-Fi Password',
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        return true;
                    }
                }
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        /*$timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);*/
    };


    notificationService.savedConfirm =function(path, handler1) {
        return $ionicPopup.showPopup(
            {
                title: 'Picture has beed saved!\npath',
                content:'',
                buttons: [
                    {
                        text: 'Share' ,
                        type: 'button-positive',
                        onTap: function(e) {
                            handler1(path);
                            return true;
                        }
                    },
                    {
                        text: 'OK',
                        type: 'button-energized',
                        onTap: function(e) {
                            return true;
                        }
                    }
                ]
            });
    };

    notificationService.confirm =function(msg, successHandler) {
        return $ionicPopup.showPopup(
            {
                title: msg,
                content:'',
                buttons: [
                    {
                        text: 'Cancel' ,
                        type: 'button-default',
                        onTap: function(e) {
                            return true;
                        }
                    },
                    {
                        text: 'OK',
                        type: 'button-energized',
                        onTap: function(e) {
                            successHandler();
                            return true;
                        }
                    }
                ]
            });
    };

    return notificationService;
});


