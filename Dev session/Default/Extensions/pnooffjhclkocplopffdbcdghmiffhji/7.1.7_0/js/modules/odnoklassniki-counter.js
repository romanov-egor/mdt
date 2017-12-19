(function(app){

    app.core.define('#odnoklassniki-counter', function(f){

        var informer,

            parseResponse = function(response){
                var count = 0;

                if(response && response.authorized){
                    count = (response.notifications || 0)
                          + (response.messages || 0)
                          + (response.photoMarks || 0);
                }

                return count;
            },

            responseHandler = function(response){
                var count = parseResponse(response);

                updateMyCounter(count);
            },

            updateMyCounter = function(count){
                var countElem = f.find('.menu__balloon')[0];

                if(count > 0){
                    f.show(countElem);
                    f.setHTML(countElem, count);
                } else {
                    f.hide(countElem);
                }
            };

        return {
            init: function(){

                var url = 'http://www.odnoklassniki.ru/browserToolbarGetData?v=3',
                    timeout = 300000;

                informer = Object.create(app.informer);
                informer.init({
                    timeout: timeout,
                    dataUrl: url,
                    handleResponse: responseHandler
                });
                informer.start();

            },
            destroy: function(){

                informer.stop();

            }
        }

    });

})(app);



