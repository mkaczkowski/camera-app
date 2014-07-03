angular.module('sioWebApp.common').factory('networkService', function($cordovaNetwork) {
    var networkService = {};

    //var type = $cordovaNetwork.getNetwork();

    networkService.isOnline = function() {
        return $cordovaNetwork.isOnline();
    };

    networkService.openMarketURL = function(url) {
        cordova.market.open(url);
        //window.plugins.market.open(url);
    };

    return networkService;
});