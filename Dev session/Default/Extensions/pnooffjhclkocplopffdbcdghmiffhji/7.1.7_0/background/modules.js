(function(app){

    var timeouts = {};

    app.core.define('create-window', function(f){

        function removeTimeout(windowId, GUID) {
            chrome.windows.remove(windowId, function(){
                f.publish({
                    type: 'capture-saved',
                    data: [GUID, 'images/no_photo.png']
                });
            });
        }

        function createWindow(options) {
            var url = options.url;
            var GUID = options.requestGUID;
            var options = {
                url:url,
                focused:false,
                left:10000,
                top:10000,
                type:'popup',
                height:1,
                width:1
            };

            chrome.windows.create(options, function (window) {
                updateWindow(window.id, GUID);

                if(timeouts[GUID] != null) {
                    window.clearTimeout(timeouts[GUID]);
                }

                timeouts[GUID] = setTimeout(function(){
                    removeTimeout(window.id, GUID);
                }, 15000);
            });
        }

        function updateWindow(windowId, GUID) {
            var options = {
                top:10000,
                left:10000,
                width:1024,
                height:768
            };

            chrome.windows.update(windowId, options, function(){
                setTimeout(function(){
                    f.publish({
                        type: 'window-created',
                        data: [windowId, GUID]
                    });
                });
            });
        }

        return {
            init: function(){
                f.onMessage('request-thumbnail', createWindow);
            },
            destroy: function(){

            }
        }
    });

    app.core.define('capture-window', function(f){

        function captureWindow(windowId, GUID) {
            setTimeout(function() {
                chrome.tabs.captureVisibleTab(windowId, { format:"png" }, function (urlData) {
                    chrome.windows.remove(windowId);

                    f.publish({
                        type: 'window-captured',
                        data: [GUID, urlData]
                    });
                });
            }, 10000);
        }

        return {
            init: function(){
                f.subscribe({
                    'window-created': captureWindow
                });
            },
            destroy: function(){

            }
        }
    });

    app.core.define('scale-capture', function(f){

        function scaleCapture(urlData, callback) {
            if (!urlData) {
                return;
            }

            var canvas_ratio = 4 / 3,
                canvas_width = 480,
                canvas_height = canvas_width / canvas_ratio;

            var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
            var context = canvas.getContext("2d");
            var image = document.createElement("img");

            function onImageLoad() {

                var image_height,
                    image_width,
                    image_ratio = image.width / image.height,
                    image_left = 0,
                    image_top = 0;

                if (canvas_ratio > image_ratio) {
                    image_width = canvas_width;
                    image_height = Math.ceil(image_width / image_ratio);
                }
                else {
                    image_height = canvas_height;
                    image_width = Math.ceil(image_height * image_ratio);
                }

                if (image_width > canvas_width) {
                    image_left = -Math.ceil((image_width - canvas_width) / 2)
                }


                canvas.width = canvas_width;
                canvas.height = canvas_height;
                context.drawImage(image, image_left, image_top, image_width, image_height);

                var url = canvas.toDataURL("image/jpeg", "");

                callback(url);
            }

            image.onload = onImageLoad;
            image.src = urlData;
        }

        function onWindowCaptured(GUID, dataURL) {
            scaleCapture(dataURL, function(dataURL){
                f.publish({
                    type: 'capture-ready',
                    data: [GUID, dataURL]
                });
            });
        }

        return {
            init: function(){
                f.subscribe({
                    'window-captured': onWindowCaptured
                });
            },
            destroy: function(){

            }
        }
    });

    app.core.define('save-capture', function(f){

        function saveCapture(GUID, dataURL){
            f.saveThumbnail(dataURL, GUID, function (thumbnailUrl) {
                f.publish({
                    type: 'capture-saved',
                    data: [GUID, thumbnailUrl]
                });
            });
        }

        return {
            init: function(){
                f.subscribe({
                    'capture-ready': saveCapture
                });
            },
            destroy: function(){

            }
        }
    });

    app.core.define('update-bookmark', function(f){

        function updateBookmark(GUID, thumbnailUrl, url){
            var options = {
                background: thumbnailUrl,
                captureState: 'received',
                ts: f.getTimestamp()
            };
            f.updateBookmark(GUID, options);

            if(timeouts[GUID] != null) {
                window.clearTimeout(timeouts[GUID]);
                delete timeouts[GUID];
            }
        }

        return {
            init: function(){
                f.subscribe({
                    'capture-saved': updateBookmark
                });
            },
            destroy: function(){

            }
        }
    });
})(app);
