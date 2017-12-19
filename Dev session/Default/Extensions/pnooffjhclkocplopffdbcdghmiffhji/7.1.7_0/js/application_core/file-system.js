(function (core) {
    var fileSystem = {};
    var size = 20 * 1024 * 1024;

    window.requestFileSystem = window.webkitRequestFileSystem || window.requestFileSystem;

    function toArray(list) {
        return Array.prototype.slice.call(list || [], 0);
    }

    function errorHandler(error) {
        var message;

        try {
            message = JSON.stringify(error);
        } catch (ex) {
            message = error.toString();
        }

        throw 'FileSystem Error:: ' + message;
    }

    function requestFileSystem(callback, errorHandler) {
        window.requestFileSystem(window.PERSISTENT, size, callback, errorHandler);
    }

    fileSystem.listFiles = function (callback) {
        var that = this;

        requestFileSystem(function (fs) {
            var dirReader = fs.root.createReader();
            var entries = [];

            var readEntries = function () {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        callback(entries.sort());
                    } else {
                        entries = entries.concat(toArray(results));
                        readEntries();
                    }
                }, errorHandler);
            };

            readEntries();

        }, errorHandler);

    },

    fileSystem.fileExists = function (fileName, callback) {
        requestFileSystem(function (fs) {
            fs.root.getFile(fileName, {create:false}, function() {
                callback(true);
            }, function() {
                callback(false);
            });
        });
    },

    fileSystem.removeFile = function (fileName, callback) {
        var that = this;

        requestFileSystem(function (fs) {

            fs.root.getFile(fileName, {create:false}, function (fileEntry) {

                fileEntry.remove(function () {
                    if (callback) {
                        callback();
                    }
                }, errorHandler);

            }, errorHandler);

        }, errorHandler);
    }

    fileSystem.removeAllFiles = function () {
        var that = this;

        that.listFiles(function (entries) {
            entries.forEach(function (entry) {
                that.removeFile(entry.name);
            });
        });

    }

    fileSystem.writeThumbnail = function (dataUrl, fileName, callback) {
        var that = this;

        if (dataUrl.indexOf("data:") != 0) {
            errorHandler("it isn't available to determine a mime type");
            return;
        }

        var contentType = dataUrl.substr(5, dataUrl.indexOf(";") - 5);

        var data = dataUrl.substr(dataUrl.indexOf(",") + 1);
        data = window.atob(data);

        var buffer = new ArrayBuffer(data.length);
        var array = new Uint8Array(buffer);

        for (var i = 0; i < data.length; i++) {
            array[i] = data.charCodeAt(i);
        }

        requestFileSystem(function (fs) {
            fs.root.getFile(fileName, {create:true}, function (fileEntry) {

                fileEntry.createWriter(function (fileWriter) {

                    fileWriter.onwriteend = function () {
                        callback(fileEntry.toURL());
                    };
                    fileWriter.onerror = errorHandler;

                    var blob;

                    try {
                        blob = new Blob([array], {type:contentType});
                    } catch (ex) {
                        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
                        var builder = new BlobBuilder();
                        builder.append(buffer);
                        blob = builder.getBlob(contentType);
                    }

                    fileWriter.write(blob);

                }, errorHandler);

            }, errorHandler);

        }, errorHandler);

    }


    core.fileSystem = fileSystem;
})(app.core);
