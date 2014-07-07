angular.module('sioWebApp.common').factory('networkService', function($cordovaNetwork) {
    var networkService = {};

    //var type = $cordovaNetwork.getNetwork();

    networkService.isOnline = function() {
        return $cordovaNetwork.isOnline();
    };

    networkService.openMarketURL = function(url) {
		cordova.market.open(url);
    };

	networkService.openMarketURL2 = function(url) {
		window.plugins.market.open(url)
	};

	networkService.openMarketURL3 = function(url) {
		navigator.market.open(url)
	};

    return networkService;
});