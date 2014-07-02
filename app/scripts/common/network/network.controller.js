angular.module('sioWebApp.common').controller('NetworkCtrl', function($scope, $cordovaNetwork) {
	var type = $cordovaNetwork.getNetwork();

	var isOnline = $cordovaNetwork.isOnline();

	var isOffline = $cordovaNetwork.isOffline();
});
