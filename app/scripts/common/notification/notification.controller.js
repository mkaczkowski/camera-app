angular.module('sioWebApp.common').controller('NotificationCtrl', function($scope, cordovaDialogs) {

	$cordovaDialogs.alert('Wow!');

	//$cordovaDialogs.confirm('Are you sure?');

	//$cordovaDialogs.prompt('Please Login');

	// beep 3 times
	//$cordovaDialogs.beep(3);

});
