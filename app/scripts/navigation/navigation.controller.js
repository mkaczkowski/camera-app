'use strict';
angular.module('sioWebApp.navigation').controller('NavigationCtrl', function ($scope, $location) {
	$scope.menuItems = [
		{name:'Home', path:'home'},
		{name:'Contact', path:'contact'}
	];

	$scope.isActive = function (path) {
		return $location.path().substr(0, path.length) == path;
	};
});