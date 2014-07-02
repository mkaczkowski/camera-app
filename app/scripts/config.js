'use strict';
angular.module('sioWebApp.config', [])
		.constant('configuration', {
			name : 'SIO2 Backoffice',
			version : 'SIO2 Backoffice v.2.0',
			copyright : 'Ministerstwo Edukacji Narodowej, Szucha 25, Warszawa',
			restEndpoint: 'http://localhost:18080',
			isProd: JSON.parse('false')
		}
);
