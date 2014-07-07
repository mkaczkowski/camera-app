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

	notificationService.showInfo = function(msg) {
		var alertPopup = $ionicPopup.alert({
			title: msg,
			okType: 'button-energized'
		});
		alertPopup.then(function(res) {
			console.log('showAlert closed.');
		});
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

	notificationService.showInitPopup = function(handler1,handler2) {
		var alertPopup = $ionicPopup.show({
			title: 'Welcome!', // String. The title of the popup.
			subTitle: 'Please take a picture or choose from gallery', // String (optional). The sub-title of the popup.
			scope: null, // Scope (optional). A scope to link to the popup content.
			buttons: [{ //Array[Object] (optional). Buttons to place in the popup footer.
				text: 'Camera',
				type: 'button-energized',
				onTap: function(e) {
					handler1();
					return true;
				}
			}, {
				text: 'Gallery',
				type: 'button-energized',
				onTap: function(e) {
					handler2();
					return true;
				}
			}]
		});

		alertPopup.then(function(res) {
			console.log('showAlert closed.');
		});
	};

    return notificationService;
});


