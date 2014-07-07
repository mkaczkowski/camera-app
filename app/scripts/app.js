'use strict';
var sioWebApp = angular.module('sioWebApp', [
    'underscore',
    'ionic',
    'hmTouchEvents',
    'ngCordova.plugins.camera',
    'ngCordova.plugins.dialogs',
    'ngCordova.plugins.network',
    'ngCordova.plugins.socialSharing',
    'sioWebApp.config',
    'sioWebApp.mock',
    'sioWebApp.common',
    'sioWebApp.navigation',
    'sioWebApp.home'
]);

sioWebApp.config(function(loggerProvider) {
    loggerProvider.enabled(true);
});

sioWebApp.controller('AppCtrl', function ($scope,networkService, configuration) {
    $scope.rateUs = function(){
        networkService.openMarketURL(configuration.marketUrl)
    };
	$scope.rateUs2 = function(){
		networkService.openMarketURL2(configuration.marketUrl)
	};
	$scope.rateUs3 = function(){
		networkService.openMarketURL3(configuration.marketUrl)
	};

});

sioWebApp.run(function($rootScope,configuration) {

    $rootScope.app = configuration;

    /*var LOG = logger.getInstance('sioWebApp');
     LOG.log('This is a log');
     LOG.info('This is a info');
     LOG.warn('This is a warn');
     //	LOG.error('This is a {0} error! {1}', [ 'big', 'just kidding' ]);
     LOG.debug('This is a debug for line {0}', [ 8 ]);

     var numbers = [10, 5, 100, 3, 1000];
     LOG.debug(_.min(numbers));*/
});

