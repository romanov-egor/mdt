(function(app){

    app.core.define('#traffic', function(f){

        var informer, geoChangeHandler, el,

            render = function(description, score, url){
                if (url) {
                    url = url.replace(/^\w+\:\/\//, '');
                    url = 'http://r.mail.ru/clb' + f.config('statistics').traffic + '/' + url;
                }

                var config = {
                    'name': 'a',
                    'class': 'informer informer__traffic-jam' + (score > 9 ? ' informer__traffic-jam_top' : ''),
                    'href': url,
                    'refNode': el,
                    'children': [{
                        'class': 'informer__content',
                        'children': [{
                            'class': getInformerIconClassName(score)
                        }, {
                            'class': 'informer__value',
                            'text': score
                        }, {
                            'class': 'informer__subvalue',
                            'text': f.decline(score, 'баллов', 'балл', 'балла')
                        }, {
                            'class': 'informer__description',
                            'text': description,
                            'title': description
                        }]
                    }]
                };

                f.clearElement(el);
                f.createElement(config);
            },

            getInformerIconClassName = function(score){
                var className = 'informer__icon';

                if(score >= 8){
                    className += ' informer__icon_jam_top';
                } else if(score >= 5){
                    className += ' informer__icon_jam_middle';
                }

                return className;
            },

            validateResponse = function(obj){
                if('data' in obj &&
                    'description' in obj.data &&
                    'score' in obj.data &&
                    'url' in obj.data){
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
                    var data = response.data;

                    render(data.description, data.score, data.url);
                } else {
                    f.clearElement(el);
                }
            };

        return {
            init: function(){

                var url = 'http://ad.mail.ru/adi/5263',
                    timeout = 300000;
                el = f.getEl(),
                informer = Object.create(app.informer);
                informer.init({
                    timeout: timeout,
                    dataUrl: url,
                    handleResponse: responseHandler
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

