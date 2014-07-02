'use strict';
angular.module('sioWebApp.mock', [ 'ngMockE2E'])
		.run(['$httpBackend', function($httpBackend) {

			$httpBackend.whenGET(/\.html$/).passThrough();

			/*$httpBackend.whenGET(/getMenu/).respond(function(method,url,data) {
				return [200,
					[
						{"name":"Statystyki","path":"statistics","level":0,"enabled":true},
						{"name":"Podmioty problemy","path":"podmiot-util","level":0,"enabled":true},
						{"name":"Wyjatki","path":"exceptions","level":0,"enabled":true},
						{"name":"Wyjatki szczegolowe","path":"detailed-exceptions","level":0,"enabled":true}
					]
					, {}];
			});

			$httpBackend.whenGET(/getReports/).respond(function(method,url,data) {
				return [404];
			});

			$httpBackend.whenGET(/exception\?/).respond(function(method,url,data) {
				return [200,
					{"rows":{"id":"1","txId":"2","exceptionId":3,"active":true, "counter":1,"created":"11122014"}}
					, {}];
			});

			$httpBackend.whenGET(/exceptionTx\?/).respond(function(method,url,data) {
				return [200,
					{"rows":{"id":"1","txId":"2","exceptionId":3,"active":true, "counter":1,"created":"11122014"}}
					, {}];
			});*/
		}]);

