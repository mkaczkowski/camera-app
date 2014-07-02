angular.module('sioWebApp.common').controller('FileCtrl', function($scope, $cordovaFile) {

	$scope.api = function(){
		$cordovaFile.checkDir(directory).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		// parameters: directory, replace (boolean)
		$cordovaFile.createDir(directory, false).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		$cordovaFile.checkFile(directory, file).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		// parameters: directory, file, replace (boolean)
		$cordovaFile.createFile(directory, file, true).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		$cordovaFile.removeFile(directory, file).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		// doesn't function at the moment
		$cordovaFile.writeFile(directory, file).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});

		// Reads a file as TEXT
		$cordovaFile.readFile(directory, file).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});

		// parameters: source, filePath, trust all hosts (boolean), options
		$cordovaFile.downloadFile(source, filePath, true, options).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});


		// parameters: source, filePath, options
		$cordovaFile.uploadFile(server, filePath, options).then(function(result) {
			// Success!
		}, function(err) {
			// An error occured. Show a message to the user
		});
	}
});
