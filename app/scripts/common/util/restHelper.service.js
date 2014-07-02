angular.module('sioWebApp.common').service ('serviceUtil', [ '$resource','configuration', function ($resource, configuration) {

	this.createResource = function (path, operations) {
		var resource =  $resource(configuration.restEndpoint + path,{},operations);
		return this._applyHandlers(resource,operations);
	},

	/**
	 * wspolna obsluga bledow dla wszystkich metod tego serwisu
	 */
	this._applyHandlers = function (resource, operations) {
		angular.forEach(operations, function(value, operation){
			var publicMethod  = operation.substr(1);
			resource[publicMethod] = function(params, success, error) {
				return resource[operation](params,null,null).$promise.then(function (result) {
					success(result);
				},function (err) {
					toastr.error(err.statusText, "Błąd :: " + err.status);
					if(error){
						error(err);
					}
				});
			}
		});
		return resource;
	};

}]);