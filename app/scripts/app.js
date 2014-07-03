'use strict';
/**
 * @ngdoc overview
 * @name sioWebApp
 * @description
 * # sioWebApp
 *
 * Main module of the application.
 */
var sioWebApp = angular.module('sioWebApp', [
	'underscore',
	'ngResource',
	'ui.router',
	'ionic',
	'ng-cordova',
	'hmTouchEvents',
	'sioWebApp.config',
	'sioWebApp.mock',
	'sioWebApp.common',
	'sioWebApp.navigation',
	'sioWebApp.home',
	'sioWebApp.friends'
]);

/*sioWebApp.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})*/

sioWebApp.config(['$stateProvider','$urlRouterProvider','loggerProvider', function($stateProvider, $urlRouterProvider, loggerProvider) {

	// setup an abstract state for the tabs directive
	$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'views/home/home.html',
				controller: 'HomeCtrl'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: 'views/contact/contact.html',
				controller: 'ContactCtrl',
				resolve: { loadMyModule: ['$ocLazyLoad', function($ocLazyLoad) { return $ocLazyLoad.load(["sioWebApp.contact"])}]}
			})

	$urlRouterProvider.otherwise('/home');

	loggerProvider.enabled(true);

}]);


sioWebApp.run(function($rootScope,configuration,$timeout, logger, _) {

	$rootScope.app = configuration;

	var LOG = logger.getInstance('sioWebApp');
	LOG.log('This is a log');
	LOG.info('This is a info');
	LOG.warn('This is a warn');
//	LOG.error('This is a {0} error! {1}', [ 'big', 'just kidding' ]);
	LOG.debug('This is a debug for line {0}', [ 8 ]);

	var numbers = [10, 5, 100, 3, 1000];
	LOG.debug(_.min(numbers));
});

