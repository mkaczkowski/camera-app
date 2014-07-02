'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'SIO2 Backoffice',
			version : 'SIO2 Backoffice v.1.0',
			copyright : 'Ministerstwo Edukacji Narodowej, Szucha 25, Warszawa',
			restEndpoint: '',
			isProd: JSON.parse('true')
		}
);
