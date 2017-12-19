(function(app){

    // informer prototype
    app.informer = {

           init: function(options){
               this.hasData = false;
               this.timeoutId = null;
               this.timeout = options.timeout;
               this.dataUrl = options.dataUrl;
               this.currentTimeout = options.timeout,
               this.handleResponse = options.handleResponse,
               this.handleError = options.handleError
           },

           get: function(callback){
               var that = this;

               $.ajax({
                   url: this.dataUrl,
                   success: function(response){
                       that.currentTimeout = that.timeout;

                       if(that.handleResponse){
                           that.handleResponse(response);
                       }
                   },
                   error: function(){
                       
                       if(that.handleError){
                           that.handleError();
                           return;
                       }
                       
                       that.currentTimeout = 3000;
                   },
                   complete: callback
               });

           },

           start: function(){
                if(this.dataUrl === undefined || this.timeout === undefined){
                    return;
                }

               var that = this;

                (function f(){

                    that.get(function(){
                        that.timeoutId = window.setTimeout(f, that.currentTimeout);
                    });

                })();

            },

           stop: function(){

               if(this.timeoutId != null){
                   window.clearTimeout(this.timeoutId);
                   this.timeoutId = null;
               }

           },

           restart: function(){
               this.stop();
               this.start();
           }
        };

})(app);

