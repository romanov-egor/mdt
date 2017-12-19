(function(app){

    app.core.define('#news', function(f){

        var informer,

            parseResponse = function(response){
                var result = response;

                if (typeof response == 'string') {
                    result = JSON.parse(response);
                }

                return result;
            },

            responseHandler = function(response) {
                var newsItems = parseResponse(response);

                view(newsItems);
                save(newsItems);
            },

            save = function(newsItems) {

                var saveData = {data: newsItems, timeUpdate: new Date().getTime()};
                app.core.storage.set('visual-bookmarks.news', saveData);
            },

            errorHandler = function() {
                var oldData = app.core.storage.get('visual-bookmarks.news');
                if (oldData) {
                    view(oldData.data);
                }
            },

            wrapUrl = function(url) {
                return 'http://r.mail.ru/clb19106155/' + encodeURI(url.replace(/^https?:\/\//, ''));
            },

            view = function(items) {
                var newsHtml = '';
                var urlSearch = 'http://go.mail.ru/news?fr=' + app.config.fr + '&fr2=news&q=';
                var newsBox = $('#news .news_items_wraper');

                newsBox.html('');
                for (var key in items) {
                    newsHtml += '<a class="news_item" style="background-image:url(\'' + items[key].image + '\');" href="' + wrapUrl(items[key].url) + '">'
                                + ' <div class="news_title">'
                                + '     <h3>' + items[key].text + '</h3>'
                                + ' </div>'
                                + '</a>';
                }

                newsBox.append(banners());
                newsBox.append(newsHtml);

                //$('#news .news_item').click(openNews);
                $('.news_next').click(scrollNext);
                $('.news_back').click(scrollBack);
            },

            openNews = function(e) {
                var query = $(this).attr('data-query');

            },

            banners = function() {
                // for test use:
                // localStorage.nb = '[43689, 43689]'
                // for disable test use:
                // localStorage.removeItem('nb')

                var slots = ['43602', '43688'];
                try { slots = JSON.parse(localStorage.nb); } catch (e) {}

                return slots.map(function(slotId) {
                    var url = 'http://ad.mail.ru/adi/' + slotId + '?rnd=' + Math.floor(Math.random() * 1e7);
                    var html = $('<a class="news_item news_item_banner"></a>');

                    var success = function(json) {
                        try {
                            json = JSON.parse(json);
                            var url = json.url || json.domain;

                            if (!url) {
                                throw Error('no data');
                            }

                            var title = $('<div class="news_title"></div>');
                            var header = $('<h3></h3>');

                            html.attr('href', url);
                            html.attr('style', 'background-image:url(' + json.image + ')');

                            header.text(json.header);

                            title.append(header);
                            html.append(title);
                        } catch (e) {
                            html.remove();
                        }
                    };

                    var error = function(xhr, type, error) {
                        success();
                    };

                    $.ajax({ url: url, success: success, error: error });

                    return html;
                });
            },

            scrollNext = function(e) {
                var newScroll = $("#news .news_items_scroll")[0].scrollLeft + 186 * 3;
                if (newScroll + $("#news .news_items_scroll").width() >= $("#news .news_items_wraper").width()) {
                    $('.news_next').addClass('disabled');
                }

                $('.news_back').removeClass('disabled');
                $("#news .news_items_scroll").animate({
                    scrollLeft: newScroll
                }, 200);
            },

            scrollBack = function(e) {
                var newScroll = $("#news .news_items_scroll")[0].scrollLeft - 186 * 3;
                if (newScroll <= 0) {
                    $('.news_back').addClass('disabled');
                }
                $('.news_next').removeClass('disabled');;

                $("#news .news_items_scroll").animate({
                    scrollLeft: newScroll
                }, 200);
            };

        return {
            init: function(){

                var fun = function(){
                    var url = 'http://internet.go.mail.ru/bfeed',
                        timeout = 20 * 60 * 1000;

                    informer = Object.create(app.informer);
                    informer.init({
                        timeout: timeout,
                        dataUrl: url,
                        handleResponse: responseHandler,
                        handleError: errorHandler
                    });

                    informer.start();
                };

                var oldData = app.core.storage.get('visual-bookmarks.news');
                var start = 0;
                if (!oldData || new Date().getTime() - oldData.timeUpdate > 20 * 60 * 1000) {
                    fun();
                } else {
                    view(oldData.data);
                }

                //window.setTimeout(fun, start);

            },
            destroy: function(){

                informer.stop();

            }
        }

    });

})(app);