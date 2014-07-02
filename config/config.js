'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'SIO2 Backoffice',
			version : '@@version',
			copyright : 'Ministerstwo Edukacji Narodowej, Szucha 25, Warszawa',
			restEndpoint: '@@restEndpoint',
			isProd: JSON.parse('@@isProd')
		}
);
