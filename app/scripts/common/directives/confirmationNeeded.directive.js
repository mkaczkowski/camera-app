'use strict';
angular.module('sioWebApp.common').directive("confirmationNeeded", function () {
	return {
		priority: 1,
		terminal: true,
		link: function (scope, element, attr) {
			var msg = attr.confirmationNeeded || "Czy na pewno?";
			var clickAction = attr.ngClick;
			element.bind('click',function () {
				if ( window.confirm(msg) ) {
					scope.$eval(clickAction)
				}
			});
		}
	};
});