(function(app){

    app.core.define('geo-monitoring', function(f){

        var geo,
            isGeoInitialized = false,
            domain = 'http://mail.ru',
            cookieName = 's',
            timeout = 3000,
            timeoutId = null;

        return {
            init: function(){
                var that = this;

                (function f(){

                    that.checkCookie(function(){
                        timeoutId = window.setTimeout(f, timeout);
                    });

                })();
            },
            destroy: function(){
                if(timeoutId != null){
                    window.clearTimeout(timeoutId);
                }

                geo = timeoutId = null;
            },
            checkCookie: function(callback){
                var that = this;

                chrome.cookies.get({"url": domain, "name": cookieName}, function(cookie) {

                    if(f.isObject(cookie)){
                        var cookieObj = that.parseCookie(cookie.value);
                        var newGeo = cookieObj.geo;

                        if(!isGeoInitialized){
                            isGeoInitialized = true;
                        }else if(newGeo != geo){
                            f.publish({
                                type: 'geo-change',
                                data: [newGeo]
                            });
                        }

                        geo = newGeo;
                    }

                    callback();
                });

            },
            parseCookie: function(cookieValue){
                var obj = {};

                cookieValue.replace( /(\w+)\=(.*?)(\||$)/g, function($0, $1, $2) {
                    obj[$1] = $2;
                });

                return obj;
            }

        }

    });

})(app);




