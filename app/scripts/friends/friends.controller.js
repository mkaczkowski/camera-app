'use strict';

angular.module('sioWebApp.friends').controller('DashCtrl', function ($scope) { });

angular.module('sioWebApp.friends').controller('FriendsCtrl', function ($scope,Friends) {
	$scope.friends = Friends.all();
});

angular.module('sioWebApp.friends').controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
});