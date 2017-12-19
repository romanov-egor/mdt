(function(app){

    app.core.define('#weather', function(f){

        var informer, geoChangeHandler, el,

        render = function(value, city, description, status, prefix){
            var weatherClassName = getWeatherClassNameByStatus(status, prefix);
            var config = {
                'class':'informer informer-weather',
                'name':'a',
                'href': 'http://go.mail.ru/search?fr=' + app.config.fr + '&fr2=informer&q=погода',
                'refNode': el,
                'children':[
                    {
                        'class': 'informer__content ' + weatherClassName,
                        'children': [{
                            'class': 'informer__icon'
                        }, {
                            'class': 'informer__value',
                            'text': (value > 0 ? '+':'') + value + '°'
                        }, {
                            'class': 'informer__city',
                            'text': city
                        }, {
                            'class': 'informer__description',
                            'text': description,
                            'title': description
                        }]
                    }
                ]

            };

            f.clearElement(el);
            f.createElement(config);
        },

        validateResponse = function(obj){
            if('city' in obj &&
               'weather_now' in obj &&
               'weather_icon_prefix' in obj &&
               'weather_status' in obj &&
               'weather_title' in obj){
                return true;
            } else {
                return false;
            }
        },

        responseHandler = function(response){
            var isResponseValid;

            if(f.isString(response)){
                try {
                    response = JSON.parse(response);
                } catch(ex){
                    isResponseValid = false;
                }

            } else if(!f.isObject(response)){
                isResponseValid = false;
            }

            if(isResponseValid === undefined){
                isResponseValid = validateResponse(response);
            }

            if(isResponseValid){
                informer.hasData = true;
                render(response.weather_now, response.city, response.weather_title, response.weather_status, response.weather_icon_prefix);
            } else {
                f.clearElement(el);
            }
        },

        getWeatherClassNameByStatus = function(status, prefix){
            var className = '';

            switch(status){
                case 1:
                case 4:
                case 11:
                case 14:
                case 15:
                case 20:
                case 21:
                case 23:
                    className = 'informer-weather-3';
                    break;
                case 2:
                case 3:
                case 12:
                case 13:
                case 17:
                case 27:
                case 30:
                case 33:
                case 41:
                case 42:
                case 43:
                    className = 'informer-weather-8';
                    break;
                case 5:
                case 16:
                case 22:
                case 24:
                case 26:
                case 28:
                case 31:
                case 32:
                    className = 'informer-weather-2';
                    break;
                case 6:
                case 9:
                case 10:
                case 18:
                case 25:
                case 48:
                    className = prefix== 'n' ? 'informer-weather-2' : 'informer-weather-5';
                    break;
                case 7:
                    className = 'informer-weather-1';
                    break;
                case 8:
                case 19:
                case 29:
                case 34:
                case 35:
                case 36:
                case 37:
                case 38:
                case 39:
                case 40:
                case 44:
                case 45:
                case 46:
                case 47:
                    className = 'informer-weather-4';
                    break;

            }

            return className;
        };

        return {
            init: function(){

                var url = 'http://ad.mail.ru/adi/5261',
                    timeout = 300000;

                el = f.getEl();
                informer = Object.create(app.informer);
                informer.init({
                    timeout: timeout,
                    dataUrl: url,
                    handleResponse: responseHandler
                });

                geoChangeHandler = f.proxy(informer.restart, informer);
                f.subscribe({
                    'geo-change': geoChangeHandler
                });

                informer.start();
            },
            destroy: function(){
                informer.stop();

                f.unsubscribe({
                    'geo-change': geoChangeHandler
                });
            }
        }

    });

})(app);
