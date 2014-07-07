'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'Dragon Camera',
			barStyle : 'bar-energized',
			version : '1.0.0',
            marketUrl: 'com.dragon.camera2',
			isProd: JSON.parse('true')
		}
);
