(function(app){

// sandbox/facade
    app.f = {
        define:function( core, module ){

            //debug
            var core = app.core,
                dom = core.dom,
                storage = core.storage,
                events = core.events,
                utils = core.utils,
                ui = core.ui,
                component = core.dom.query(module)._elements;


            return {

                publish:function( e ){
                    events.trigger(e);

                },
                subscribe:function( e ){
                    events.register(e, module);
                },

                unsubscribe:function( e ){
                    events.remove(e, module);
                },

                proxy: function(fun, context){
                    return events.proxy(fun, context);
                },

                find: function( selector, context ){

                    return context === undefined ?
                        component.query(selector)._elements :
                        core.dom.query(selector, context)._elements;
                },

                getEl:function(){
                    return component[0];
                },

                animate:function(el, props ){
                    return core.dom.animate(el, props);
                },

                bind:function( el , type, fn ){
                    dom.bind(el, type, fn);
                },

                unbind:function( el , type, fn ){
                    dom.unbind(el, type, fn);
                },

                on: function(eventType, selector, handler){
                    dom.on(component[0], eventType, selector, handler);
                },

                off: function(eventType, selector, handler){
                    dom.off(component[0], eventType, selector, handler);
                },

                ignore:function( e ){
                    events.remove(e, module);
                },

                createElement:function(config){
                    var i, child, el, text;

                    if (config) {

                        if('name' in config){
                            el = dom.createElement(config.name);
                            delete config.name;
                        } else {
                            el = dom.createElement('div');
                        }

                        if (config.children && dom.isArray(config.children)) {
                            i = 0;
                            while(child = config.children[i]) {
                                el.appendChild(this.createElement(child));
                                i++;
                            }
                            delete config.children;
                        }
                        if ('text' in config) {
                            el.appendChild(document.createTextNode(config.text));
                            delete config.text;
                        }

                        if('refNode' in config){
                            config.refNode.appendChild(el);
                            delete config.refNode;
                        }

                        if(config.on && dom.isObject(config.on)){
                            for(var key in config.on){
                                if(config.on.hasOwnProperty(key) && dom.isFunction(config.on[key])){
                                    el['on' + key] = config.on[key];
                                }
                            }

                            delete config.on;
                        }

                        dom.attr(el, config);
                    }

                    return el;
                },

                clearElement: function(el){
                    if (!el) {
                        return;
                    }

                    var nodes = el.childNodes;

                    for(var i = nodes.length; i--;){
                        el.removeChild(nodes[i]);
                    }
                },

                removeChild: function(child, parent){
                    parent.removeChild(child);
                },

                setHTML: function( el, content ){
                    el.innerHTML = content;
                },

                newGUID: function(){
                    return app.utils.newGUID();
                },

                trim: function(str){
                    return utils.trim(str);
                },

                fixupURL: function(url){
                    return utils.fixupURL(url);
                },

                extend: function(){
                    return utils.extend.apply(this, arguments);
                },

                css: function( el, props ){
                    return dom.css(el, props);
                },

                show: function(el){
                  return dom.show(el);
                },

                hide: function(el){
                    return dom.hide(el);
                },

                getAttribute:function(el, attribs){
                    return dom.getAttribute(el, attribs);
                },

                setAttribute: function(el, attrib, value){
                    dom.setAttribute(el, attrib, value);
                },

                removeAttribute: function(el, attrib){
                    dom.removeAttribute(el, attrib);
                },

                hasClass: function(el, className){
                    return dom.hasClass(el, className);
                },

                addClass: function(el, className){
                    return dom.addClass(el, className);
                },

                removeClass: function(el, className){
                    return dom.removeClass(el, className);
                },

                outerWidth: function(el, includeMargin){
                    return dom.outerWidth(el, includeMargin || false);
                },

                width: function(el, value){
                    return dom.width(el, value);
                },

                offset: function(el){
                    return dom.offset(el);
                },

                position: function(el){
                    return dom.position(el);
                },

                index: function(el){
                    return dom.index(el);
                },

                closest: function(el, className){
                    return dom.closest(el, className);
                },

                children: function(el){
                    return dom.children(el);
                },

                parent: function(el, selector){
                    return dom.parent(el, selector);
                },

                parents: function(el, selector){
                    return dom.parents(el, selector);
                },

                prepend: function(target, elem){
                    dom.prepend(target, elem);
                },

                append: function(el, elems){
                    dom.append(el, elems);
                },

                text: function(el, text){
                    return dom.text(el, text);
                },

                getRandomColor:function(){
                    return app.randomColor();
                },

                ajax: function(options){
                    return dom.ajax(options);
                },

                sendStats: function(counter){

                    if (app.config.debug) {
                        return;
                    }

                    var counterId = app.config.statistics[counter];

                    if(this.isNumber(counterId)){
                        dom.ajax({
                            url: 'http://rs.mail.ru/sb' + counterId + '.gif'
                        });
                    }
                },

                sendStatsToMRDS: function(params) {
                    if (app.config.debug) {
                        return;
                    }
		    chrome.runtime.sendMessage({ type: 'metric', data: app.extendObj(params, { variation: app.config.variation }) }, function(response) { /* Do nothing */ });
                },

                inArray: function(value, array, fromIndex){
                    return core.inArray(value, array, fromIndex);
                },

                isString: function(str){
                    return core.dom.isString(str);
                },

                isNumber: function(str){
                    return core.dom.isNumber(str);
                },

                isObject: function(obj){
                    return core.dom.isObject(obj);
                },

                isEmptyObject: function(obj){
                    return core.dom.isEmptyObject(obj);
                },

                isArray: function(arr){
                    return core.dom.isArray(arr);
                },

                isFunction: function(fun){
                    return core.dom.isFunction(fun);
                },

                getTimestamp: function(){
                    return (new Date()).valueOf();
                },

                getStorageItem: function (key) {
                    return storage.get(key);
                },

                setBackground: function(background){
                    dom.setAttribute(document.body, 'class', 'body ' + background);
                    storage.set('visual-bookmarks.background.image', background);
                },

                setStorageItem: function (key, value) {
                    storage.set(key, value);
                },

                removeStorageItem: function (key) {
                    storage.remove(key);
                },

                getBackground: function(){
                    var theme = storage.get('visual-bookmarks.background.image');

                    if (theme) {
                        var allBackgrounds = this.config('themes');
                        var index = allBackgrounds.findIndex(function(item) {
                            return theme === item.value;
                        });

                        if (index < 0) {
                            return undefined;
                        }
                    }

                    return theme;
                },

                isDefaultBookmarkUpdated: function(){
                    return storage.get('visual-bookmarks.default-bookmark_updated');
                },

                setUpdateDefaultBookmark: function(){
                    return storage.set('visual-bookmarks.default-bookmark_updated', 1);
                },

                getBookmarks: function(){
                    var key = 'visual-bookmarks.default-bookmark_install';
                    var bookmarks = storage.getBookmarks();

                    if (bookmarks.length == 0 && !storage.get(key)) {
                        bookmarks = this.config('default_bookmarks');
                        storage.set(key, true);
                    }

                    return bookmarks;
                },

                getBookmark: function(name){
                    return storage.getBookmark(name);
                },

                updateBookmark: function (name, options){
                    storage.updateBookmark(name, options);
                },

                setBookmarks: function(bookmarks){
                    storage.set('visual-bookmarks.bookmarks', bookmarks);
                },

                getBookmarkUpdateVersion: function(){
                    return storage.get('visual-bookmarks.default-bookmark_updated');
                },

                setUpdateDefaultBookmark: function(version){
                    return storage.set('visual-bookmarks.default-bookmark_updated', version);
                },

                getThumbnail: function(fileName, callback){

                },

                thumbnailExists: function(fileName, callback) {
                    core.fileSystem.fileExists(fileName, callback);
                },

                setThumbnail: function(fileName, urlData, callback){

                },

                log: function (msg) {

                },

                dialog: function(options, className){

                    var config = {
                        'refNode': document.body,
                        'class': 'dialog ' + (className ? className : ''),
                        'children': [
                            {
                                'class': 'space'
                            },
                            {
                                'class': 'dialog-body',
                                'children': [
                                    {
                                        'class': 'portal-popup__close',
                                        'children': [
                                            {
                                                'class': 'portal-popup__close__icon',
                                                'text': '×'
                                            }
                                        ],
                                        'on': {
                                            'click': onClose
                                        }
                                    },
                                    {
                                        'class': 'content',
                                        'children': (options.content && [options.content]) || []
                                    }
                                ]
                            }
                        ]
                    };

                    var elem = this.createElement(config),
                        body = elem.getElementsByClassName('dialog-body')[0];

                    dom.bind(document, 'keyup', onKeyUp);

                    window.setTimeout((function() {
                        body.style.marginTop = (- body.clientHeight / 2) + "px";
                        body.style.visibility = 'visible';
                    }), 0);


                    function onClose(){
                        dom.unbind(document, 'keyup', onKeyUp);
                        document.body.removeChild(elem);
                    }

                    function onKeyUp (event) {
                        if (event.keyCode == 27) {
                            onClose();
                        }
                    }

                    return {
                        elem: elem,
                        close:  onClose
                    }
                },

                decline: function(count, form1, form2, form3){
                    return utils.decline(count, form1, form2, form3);
                },

                sendMessage: function(msg, val){
                    core.messages.send(msg, val)
                },

                onMessage: function(msg, handler) {
                    core.messages.on(msg, handler);
                },

                saveThumbnail: function(dataUrl, fileName, callback){
                    core.fileSystem.writeThumbnail(dataUrl, fileName, callback);
                },

                removeThumbnail: function(bookmarkName){
                    core.fileSystem.removeFile(bookmarkName);
                },

                config: function (key) {
                    return app.config[key];
                },

                keys: function(obj) {
                    return app.utils.keys(obj);
                }

            }
        }
    };

})(app);
