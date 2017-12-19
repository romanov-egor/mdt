(function(app){

    app.core.define('#currency', function(f){

        var el,
            informer,
            informers,
            geoChangeHandler,
            informersContainer,
            offlineInformersClassName = 'informers_offline',
            tinyInformersClassName = 'informers_tiny',
            render = function(items){

                var config = {
                    'children': (function(items){
                        var arr =  items.map(function(item){
                            return {
                                'name': 'a',
                                'class': 'informer informer-exchange ' + getClassNameByCode(item.currencyType),
                                'href': 'http://go.mail.ru/search?fr=' + app.config.fr + '&fr2=informer&q=' + getQueryByCode(item.currencyType),
                                'children': [
                                    {
                                        'class': 'informer__content',
                                        'children': [
                                            {
                                                'class': 'informer__icon ' + getInformerClassName(item.rate)
                                            },
                                            {
                                                'class': 'informer__value',
                                                'text': Math.floor(item.rate)
                                            },
                                            {
                                                'class': 'informer__subvalue' + (item.rate > 9999 ? ' informer__subvalue_align_right' : ''),
                                                'text': getSubValue(item.rate).substring(0, 3)
                                            },
                                            {
                                                'class': 'informer__description ' + (item.increment == 'minus' ? 'informer__description-down' : 'informer__description-up'),
                                                'text': item.increment == 0 ? '' : getIncrementPrefix(item.increment)  + item.incrementNum
                                            }
                                        ]
                                    }
                                ]
                            }
                        });

                        return arr;
                    })(items)
                };

                var content = f.createElement(config);

                f.clearElement(el);

                var children = f.children(content);
                var clones = [];

                for(var i = 0; i < children.length; i++){
                    clones.push( children[i].cloneNode(true) );
                }

                f.append(el, clones);

            },

            getInformerClassName = function(rate){
                var className = '';

                if(rate > 999){
                    className = 'informer__icon_align_left';
                } else if(rate > 99) {
                    className = 'informer__icon_align_middle';
                } else if(rate < 10){
                    className = 'informer__icon_align_right'
                }

                return className;
            },

            validateResponse = function(obj){
                if('data' in obj &&
                   'currency' in obj.data &&
                    f.isArray(obj.data.currency)){
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
                    f.removeClass(informers, offlineInformersClassName);
                    f.css(informersContainer, {
                        visibility: 'visible'
                    });

                    if(areValuesTiny(response.data.currency)){
                        f.addClass(informers, tinyInformersClassName);
                    } else {
                        f.removeClass(informers, tinyInformersClassName);
                    }

                    render(response.data.currency);
                } else {
                    f.clearElement(el);
                }
            },

            areValuesTiny = function(values){

                for(var i = 0; i < values.length; i++){
                    if(values[i].rate > 99) {
                        return true;
                    }
                }

                return false;
            },

            errorHandler = function(){
                if(!informer.hasData){
                    f.addClass(informers, offlineInformersClassName);
                }
            },

            getSubValue = function(value){
                value = value.toString();

                var pos = value.indexOf('.');

                return pos == -1 ? '' : value.slice(pos);
            },

            getClassNameByCode = function(code){
                var className = '';
                switch(code.toLowerCase()){
                    case 'rub':
                        className = 'informer-exchange-1';
                        break;
                    case 'usd':
                        className = 'informer-exchange-2';
                        break;
                    case 'eur':
                        className = 'informer-exchange-3';
                        break;
                    default:
                        break;
                }

                return className;
            },

            getQueryByCode = function(code){
                var query = '';
                switch(code.toLowerCase()){
                    case 'rub':
                        query = 'курс рубля';
                        break;
                    case 'usd':
                        query = 'курс доллара';
                        break;
                    case 'eur':
                        query = 'курс евро';
                        break;
                    default:
                        query = 'курс валют';
                        break;
                }

                return query;
            },

            getIncrementPrefix = function(increment){
                var prefix = '';

                if(increment == 'minus'){
                    prefix = '-';
                } else if(increment == 'plus'){
                    prefix = '+';
                }

                return prefix;
            };

        return {
            init: function(){

                var url = 'http://ad.mail.ru/adi/5262',
                    timeout = 300000;

                el = f.getEl();
                informers = f.parents(el, '.informers')[0];
                informersContainer = f.parents(el, '.informers__container')[0];
                informer = Object.create(app.informer);
                informer.init({
                    timeout: timeout,
                    dataUrl: url,
                    handleResponse: responseHandler,
                    handleError: errorHandler
                });
                informer.start();

                geoChangeHandler = f.proxy(informer.restart, informer);
                f.subscribe({
                    'geo-change': geoChangeHandler
                });

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

