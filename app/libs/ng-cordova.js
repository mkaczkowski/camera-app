angular.module('ngCordova.plugins.camera', [])

    .factory('$cordovaCamera', ['$q', function($q) {

        return {
            getPicture: function(options) {
                var q = $q.defer();

                if(!navigator.camera) {
                    q.resolve(null);
                    return q.promise;
                }

                navigator.camera.getPicture(function(imageData) {
                    q.resolve(imageData);
                }, function(err) {
                    q.reject(err);
                }, options);

                return q.promise;
            },
            cleanup: function(options) {
                var q = $q.defer();

                navigator.camera.cleanup(function() {
                    q.resolve(arguments);
                }, function(err) {
                    q.reject(err);
                });

                return q.promise;
            }

        }
    }]);
angular.module('ngCordova.plugins.dialogs', [])

    .factory('$cordovaDialogs', [function() {

        return {
            alert: function(message, callback, title, buttonName) {
                return navigator.notification.alert.apply(navigator.notification, arguments);
            },

            confirm: function(message, callback, title, buttonName) {
                return navigator.notification.confirm.apply(navigator.notification, arguments);
            },

            prompt: function(message, promptCallback, title, buttonLabels, defaultText) {
                return navigator.notification.prompt.apply(navigator.notification, arguments);
            },

            beep: function(times) {
                return navigator.notification.beep(times);
            }
        }
    }]);
// TODO: writeFile needs work, doesn't function
// TODO: add support for readFile -> readAsData
// TODO: add support for readFile -> readAsBinaryString
// TODO: add support for readFile -> readAsArrayBuffer
// TODO: add functionality to define storage size in the getFilesystem() -> requestFileSystem() method
// TODO: add documentation for FileError types
// TODO: add abort() option to downloadFile and uploadFile methods.
// TODO: add support for downloadFile and uploadFile options. (or detailed documentation) -> for fileKey, fileName, mimeType, headers
// TODO: add support for onprogress property


angular.module('ngCordova.plugins.file', [])

//Filesystem (checkDir, createDir, checkFile, creatFile, removeFile, writeFile, readFile)
    .factory('$cordovaFile', ['$q', function ($q) {

        return {
            checkDir: function (dir) {
                var q = $q.defer();

                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getDirectory(dir, {create: false},
                            //Dir exists
                            function () {
                                q.resolve();
                            },
                            //Dir doesn't exist
                            function () {
                                q.reject();
                            }
                        );
                    }
                );

                return q.promise;
            },

            createDir: function (dir, replaceBOOL) {
                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getDirectory(dir, {create: true, exclusive: replaceBOOL});
                    }
                );
            },

            checkFile: function (filePath) {
                var q = $q.defer();

                // Backward compatibility for previous function checkFile(dir, file)
                if (arguments.length == 2) {
                    filePath = '/' + filePath + '/' + arguments[1];
                }

                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getFile(filePath, {create: false},
                            // File exists
                            function () {
                                q.resolve();
                            },
                            // File doesn't exist
                            function () {
                                q.reject();
                            }
                        );
                    }
                );

                return q.promise;
            },

            createFile: function (filePath, replaceBOOL) {
                // Backward compatibility for previous function createFile(dir, file, replaceBOOL)
                if (arguments.length == 3) {
                    filePath = '/' + filePath + '/' + arguments[1];
                    replaceBOOL = arguments[2];
                }

                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getFile(filePath, {create: true, exclusive: replaceBOOL},
                            function (success) {

                            },
                            function (err) {

                            });
                    }
                );
            },

            removeFile: function (filePath) {
                var q = $q.defer();

                // Backward compatibility for previous function removeFile(dir, file)
                if (arguments.length == 2) {
                    filePath = '/' + filePath + '/' + arguments[1];
                }

                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getFile(filePath, {create: false}, function (fileEntry) {
                            fileEntry.remove(function () {
                                q.resolve();
                            });
                        });
                    }
                );

                return q.promise;
            },

            writeFile: function (filePath) {
                var q = $q.defer();

                // Backward compatibility for previous function writeFile(dir, file)
                if (arguments.length == 2) {
                    filePath = '/' + filePath + '/' + arguments[1];
                }

                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getFile(filePath, {create: false},
                            function (fileEntry) {
                                fileEntry.createWriter(
                                    function (fileWriter) {
                                        q.resolve(fileWriter);
                                    },
                                    function (error) {
                                        q.reject(error);
                                    });
                            }
                        );
                    }
                );

                return q.promise;
            },

            readFile: function (filePath) {
                var q = $q.defer();

                // Backward compatibility for previous function readFile(dir, file)
                if (arguments.length == 2) {
                    filePath = '/' + filePath + '/' + arguments[1];
                }

                getFilesystem().then(
                    function (filesystem) {

                        filesystem.root.getFile(filePath, {create: false},
                            // success
                            function (fileEntry) {
                                fileEntry.file(function (file) {
                                    var reader = new FileReader();
                                    reader.onloadend = function () {
                                        q.resolve(this.result);
                                    };

                                    reader.readAsText(file);
                                });
                            },
                            // error
                            function (error) {
                                q.reject(error);
                            });
                    }
                );

                return q.promise;
            },

            readFileMetadata: function (filePath) {
                var q = $q.defer();

                getFilesystem().then(
                    function (filesystem) {
                        filesystem.root.getFile(filePath, {create: false},
                            // success
                            function (fileEntry) {
                                fileEntry.file(function (file) {
                                    q.resolve(file);
                                });
                            },
                            // error
                            function (error) {
                                q.reject(error);
                            });
                    }
                );

                return q.promise;
            },

            downloadFile: function (source, filePath, trustAllHosts, options) {
                var q = $q.defer();
                var fileTransfer = new FileTransfer();
                var uri = encodeURI(source);

                fileTransfer.onprogress = function(progressEvent) {
                    q.notify(progressEvent);
                };

                fileTransfer.download(
                    uri,
                    filePath,
                    function (entry) {
                        q.resolve(entry);
                    },
                    function (error) {
                        q.reject(error);
                    },
                    trustAllHosts, options);

                return q.promise;
            },

            uploadFile: function (server, filePath, options) {
                var q = $q.defer();
                var fileTransfer = new FileTransfer();
                var uri = encodeURI(server);

                fileTransfer.onprogress = function(progressEvent) {
                    q.notify(progressEvent);
                };

                fileTransfer.upload(
                    filePath,
                    uri,
                    function (result) {
                        q.resolve(result);
                    },
                    function (error) {
                        q.reject(error);
                    },
                    options)

                return q.promise
            }

        };

        function getFilesystem() {
            var q = $q.defer();

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, function (filesystem) {
                    q.resolve(filesystem);
                },
                function (err) {
                    q.reject(err);
                });

            return q.promise;
        }
    }]);angular.module('ngCordova.plugins', [
    'ngCordova.plugins.deviceMotion',
    'ngCordova.plugins.camera',
    'ngCordova.plugins.geolocation',
    'ngCordova.plugins.deviceOrientation',
    'ngCordova.plugins.dialogs',
    'ngCordova.plugins.vibration',
    'ngCordova.plugins.network',
    'ngCordova.plugins.device',
    'ngCordova.plugins.barcodeScanner',
    'ngCordova.plugins.splashscreen',
    'ngCordova.plugins.keyboard',
    'ngCordova.plugins.contacts',
    'ngCordova.plugins.statusbar',
    'ngCordova.plugins.file',
    'ngCordova.plugins.socialSharing',
    'ngCordova.plugins.globalization',
    'ngCordova.plugins.sqlite',
    'ngCordova.plugins.ga',
    'ngCordova.plugins.push',
    'ngCordova.plugins.spinnerDialog',
    'ngCordova.plugins.pinDialog',
    'ngCordova.plugins.localNotification',
    'ngCordova.plugins.toast',
    'ngCordova.plugins.flashlight',
    'ngCordova.plugins.capture',
    'ngCordova.plugins.appAvailability',
    'ngCordova.plugins.prefs'
]);
angular.module('ngCordova.plugins.network', [])

    .factory('$cordovaNetwork', [function () {

        return {

            getNetwork: function () {
                return navigator.connection.type;
            },

            isOnline: function () {
                var networkState = navigator.connection.type;
                return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
            },

            isOffline: function () {
                var networkState = navigator.connection.type;
                return networkState === Connection.UNKNOWN || networkState === Connection.NONE;
            }
        }
    }]);
// NOTE: shareViaSms -> access multiple numbers in a string like: '0612345678,0687654321'
// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// NOTE: shareViaEmail -> TO, CC, BCC must be an array, Files can be either null, string or array
// TODO: add support for iPad
// TODO: add support for Windows Phone
// TODO: detailed docs for each social sharing types (each social platform has different requirements)

angular.module('ngCordova.plugins.socialSharing', [])

    .factory('$cordovaSocialSharing', ['$q', function ($q) {

        return {

			shareImage: function (image) {
				var q = $q.defer();
				window.plugins.socialsharing.share(null,null, image, null,
						function () {
							q.resolve(true); // success
						},
						function () {
							q.reject(false); // error
						});
				return q.promise;
			},

            shareViaTwitter: function (message, image, link) {
                var q = $q.defer();
                window.plugins.socialsharing.shareViaTwitter(message, image, link,
                    function () {
                        q.resolve(true); // success
                    },
                    function () {
                        q.reject(false); // error
                    });
                return q.promise;
            },

            shareViaWhatsApp: function (message, image, link) {  // image ?? link ??
                var q = $q.defer();
                window.plugins.socialsharing.shareViaWhatsApp(message, image, link,
                    function () {
                        q.resolve(true); // success
                    },
                    function () {
                        q.reject(false); // error
                    });
                return q.promise;
            },

            shareViaFacebook: function (message, image, link) {  // image ?? link ??
                var q = $q.defer();
                window.plugins.socialsharing.shareViaFacebook(message, image, link,
                    function () {
                        q.resolve(true); // success
                    },
                    function () {
                        q.reject(false); // error
                    });
                return q.promise;
            },

            shareViaSMS: function (message, number) {
                var q = $q.defer();
                window.plugins.socialsharing.shareViaSMS(message, number,
                    function () {
                        q.resolve(true); // success
                    },
                    function () {
                        q.reject(false); // error
                    });
                return q.promise;
            },

            shareViaEmail: function (message, subject, toArr, ccArr, bccArr, file ) {
                var q = $q.defer();
                window.plugins.socialsharing.shareViaEmail(message, number,
                    function () {
                        q.resolve(true); // success
                    },
                    function () {
                        q.reject(false); // error
                    });
                return q.promise;
            },

            canShareVia: function (social, message, image, link) {
                var q = $q.defer();
                window.plugins.socialsharing.canShareVia(social, message, image, link,
                    function (success) {
                        q.resolve(success); // success
                    },
                    function (error) {
                        q.reject(error); // error
                    });
                return q.promise;
            }

        }
    }]);
angular.module('ngCordova.plugins.toast', [])

    .factory('$cordovaToast', ['$q', function ($q) {

        return {
            showShortTop: function (message) {
                var q = $q.defer();
                window.plugins.toast.showShortTop(message, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            },

            showShortCenter: function (message) {
                var q = $q.defer();
                window.plugins.toast.showShortCenter(message, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            },

            showShortBottom: function (message) {
                var q = $q.defer();
                window.plugins.toast.showShortBottom(message, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            },

            showLongTop: function (message) {
                var q = $q.defer();
                window.plugins.toast.showLongTop(message, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            },

            showLongCenter: function (message) {
                var q = $q.defer();
                window.plugins.toast.showLongCenter(message, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            },

            showLongBottom: function (message) {
                var q = $q.defer();
                window.plugins.toast.showLongBottom(message, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            },


            show: function (message, duration, position) {
                var q = $q.defer();
                window.plugins.toast.show(message, duration, position, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                })
                return q.promise;
            }
        }

    }
    ]);angular.module('ngCordova.plugins.vibration', [])

    .factory('$cordovaVibration', [function() {

        return {
            vibrate: function(times) {
                return navigator.notification.vibrate(times);
            },
            vibrateWithPattern: function(pattern, repeat) {
                return navigator.notification.vibrateWithPattern(pattern, repeat);
            },
            cancelVibration: function() {
                return navigator.notification.cancelVibration();
            }
        }
    }]);