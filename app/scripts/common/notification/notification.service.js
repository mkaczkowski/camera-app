angular.module('sioWebApp.common').factory('notificationService', function($cordovaDialogs, $ionicPopup) {
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

    notificationService.showInfo = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: msg,
            okType: 'button-energized'
        });
        alertPopup.then(function(res) {
            console.log('showAlert closed.');
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


