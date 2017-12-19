(function(app){

    app.extendObj = function (destination, source) {
        var toString = Object.prototype.toString,
            toStringCall = toString.call({});
        for (var property in source) {
            if (source[property] && toStringCall == toString.call(source[property])) {
                destination[property] = destination[property] || {};
                app.extendObj(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    app.extend = function(source){
        if(typeof source == "string"){
            app[source] = {}
        }else{
            app.extendObj(app, source);
        }
    }

    app.serialize = function(obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }        
        }
    
        return str.join("&");
    }

    app.utils = (function(){

        return{
            typeEqual: function(input, desiredType){
                return app.utils.type(input).toLowerCase() == desiredType;
            },

            type:function(input){
                return Object.prototype.toString.call(input).match(/^\[object\s(.*)\]$/)[1];
            },

            newGUID: function(){

                var S4 = function() {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

            },
            keys: function(obj) {
                var array = new Array();
                for ( var prop in obj ) {
                    if ( obj.hasOwnProperty( prop ) ) {
                        array.push( prop );
                    }
                }
                return array;
            }
        }
    }());


    app.randomColor = function() {
        var letters = '0123456789ABCDEF'.split(''),
            color = '#',i=0;
        for (i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

})(app);
