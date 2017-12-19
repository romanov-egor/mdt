(function(app){

    app.core = (function(){
        var data = {};
        return{

            define: function(id, constructor){
                if(app.utils.typeEqual(id, 'string') && app.utils.typeEqual(constructor, 'function')){
                    temp = constructor(app.f.define(this, id));
                    if(temp.init && app.utils.typeEqual(temp.init, 'function')
                        && temp.destroy && app.utils.typeEqual(temp.destroy, 'function')){
                        temp = null;
                        data[id] = { define: constructor, instance: null};
                    }else{
                        app.core.throwError(1, 'Module' + id + 'registration failed. Instance cannot be initialized');
                    }
                }else{
                    app.core.throwError(1, 'Module' + id + 'registration failed. One or more args are of an incorrect type');
                }
            },
            start: function(id){
                var module = data[id];
                module.instance = module.define(app.f.define(this,id));
                module.instance.init();
            },
            startAll: function(){
                var id;
                for(id in data){
                    if(data.hasOwnProperty(id)){
                        this.start(id);
                    }
                }
            },
            stop:function(id){
                var modData;
                if(modData = data[id] && modData.instance){
                    modData.instance.destroy();
                    modData.instance = null;
                }
            },
            stopAll:function(){
                var id;
                for(id in data){
                    if(data.hasOwnProperty(id)){
                        this.stop(id);
                    }
                }
            },

            throwError: function(errType, msg){
                //console.log(errType, msg);
            },

            events: {

                register:function(events, module){
                    if(app.core.dom.isObject(events) && module){
                        if(data[module]){

                            if('events' in data[module]){
                                app.core.utils.extend(data[module].events, events);
                            } else {
                                data[module].events = events;
                            }

                        }else{
                        }
                    }

                },
                trigger: function(events){
                    if(app.core.dom.isObject(events)){
                        var mod;
                        for(mod in data){
                            if(data.hasOwnProperty(mod)){
                                mod = data[mod];
                                if(mod.events && mod.events[events.type]){
                                    mod.events[events.type].apply(null, events.data || []);
                                }
                            }
                        }
                    }

                },
                remove:function(events, module){
                    if(app.core.dom.isObject(events) && module && (module = data[module]) && module.events){
                        for(var k in events){
                            if(events.hasOwnProperty(k)){
                                delete module.events[k];
                            }
                        }
                    }
                },
                proxy: function(fun, context){
                    return jQuery.proxy(fun, context);
                }
            },

            validConstructor: function(temp){
                return (temp.init && app.utils.typeEqual(temp.init, 'function') && temp.destroy && app.utils.typeEqual(temp.destroy, 'function'));
            },

            dom: {

                query: function(selector, context){

                    var ret = {}, that = this, jqEls, i = 0;

                    if(context && !(context instanceof jQuery)){
                        context = jQuery(context);
                    }

                    if (context && context.find) {
                        jqEls = context.find(selector);
                    } else {

                        jqEls = app.core.dom.$(selector);
                    }

                    ret = jqEls.get();
                    ret.length = jqEls.length;
                    ret.query = function (sel) {
                        return that.query(sel, jqEls);
                    }

                    this._elements = ret;
                    return this;

                },

                bind: function(el, evt, fn){
                    if(el && evt){
                        if(app.utils.typeEqual(evt, 'function')){
                            fn = evt;
                        }

                        app.core.dom.$(el).bind(evt, fn);
                    }else{
                        //console.log('wrong args');
                    }
                },

                unbind:function(el, evt, fn){

                    if(el && evt){
                        if(app.utils.typeEqual(evt, 'function')){
                            fn = evt;
                        }
                        app.core.dom.$(el).unbind(evt, fn);
                    }else{
                    }
                },

                on: function(el, eventType, selector, handler){
                    app.core.dom.$(el).on(eventType, selector, handler);
                },

                off: function(el, eventType, selector, handler){
                    app.core.dom.$(el).off(eventType, selector, handler);
                },

                attr:function(el, attribs){
                    app.core.dom.$(el).attr(attribs);
                },

                getAttribute:function(el, attrib){

                    if(!(el instanceof jQuery)){
                        el =  app.core.dom.$(el);
                    }

                    return el.attr(attrib);
                },

                setAttribute:function(el, attrib, value){

                    if(!(el instanceof jQuery)){
                        el = app.core.dom.$(el);
                    }

                    el.attr(attrib, value);

                },

                removeAttribute:function(el, attrib){

                    if(!(el instanceof jQuery)){
                        el = app.core.dom.$(el);
                    }

                    el.removeAttr(attrib);
                },

                css: function(el, props){

                    if(!(el instanceof jQuery)){
                        el = app.core.dom.$(el);
                    }

                    return el.css(props);
                },

                addClass: function(el, className){
                    return jQuery(el).addClass(className);
                },

                removeClass: function(el, className){
                    return jQuery(el).removeClass(className);
                },

                hasClass: function(el, className){
                    return jQuery(el).hasClass(className);
                },

                show: function(el){
                    return jQuery(el).show();
                },

                hide: function(el){
                    return jQuery(el).hide();
                },

                outerWidth: function(el, includeMargin){
                    return jQuery(el).outerWidth(includeMargin);
                },

                offset: function(el){
                    return jQuery(el).offset();
                },

                position: function(el){
                    return jQuery(el).position();
                },

                width: function(el, value){
                    return value !== undefined ? jQuery(el).width(value) : jQuery(el).width();
                },

                closest: function(el, className){
                    return jQuery(el).closest('.'+className);
                },

                children: function(el){
                    return el.children;
                },

                index: function(el, parent){
                    return jQuery(el).index();
                },

                parent: function(el, selector){
                    return jQuery(el).parent(selector)[0];
                },

                parents: function(el, selector){
                    return jQuery(el).parents(selector);
                },

                prepend: function(target, el){
                    return jQuery(target).prepend(el);
                },

                append: function(elem, elems){

                    if('length' in elems){
                        var fragment = document.createDocumentFragment();

                        for(var i = 0; i < elems.length; i++){
                            var el = elems[i];

                            if(el instanceof  jQuery){
                                el = el[0];
                            }

                            fragment.appendChild(el);
                        }

                        elem.appendChild(fragment);
                    } else {
                        elem.appendChild(elems);
                    }

                },

                text: function(el, text){
                    return text === undefined ? jQuery(el).text() : jQuery(el).text(text);
                },

                ready:function(fn){
                    if(app.utils.typeEqual(fn, 'function')){
                        return app.core.dom.$(document).ready(fn);
                    }else{
                        //
                    }

                },

                animate:function(el, props){
                    jQuery(el).animate(props.css, props.duration, props.easing, props.complete);
                },


                ajax:function(options){

                    var xhrArgs = {};
                    xhrArgs.type = options.method;
                    xhrArgs.url = options.url;
                    xhrArgs.headers = options.headers;
                    xhrArgs.data =  options.data;
                    xhrArgs.success = options.success;
                    xhrArgs.dataType = options.type;
                    xhrArgs.cache = options.cache;
                    xhrArgs.error = options.error;
                    xhrArgs.complete = options.complete;

                    return jQuery.ajax(xhrArgs);


                },

                create:function(tag, attrs, children, refNode, pos){

                    var q;

                    if(tag){
                        q = jQuery(tag);
                    }

                    if(attrs){
                        q.attr(attrs);
                    }

                    if(refNode){
                        q.appendTo(refNode);
                    }
                    return q;
                },

                $:function(args){
                    return $(args);
                },

                //this is deprecated
                createElement: function(el){
                    return document.createElement(el);
                },

                isArray:function(arr){
                    return jQuery.isArray(arr);
                },
                isString: function(str){
                    return app.utils.typeEqual(str, 'string');
                },
                isNumber: function(num){
                    return !isNaN(parseFloat(num)) && isFinite(num);
                },
                isObject:function(obj){
                    return jQuery.isPlainObject(obj);
                },
                isEmptyObject: function(obj){
                    return jQuery.isEmptyObject(obj);
                },
                isFunction: function(fun){
                    return app.utils.typeEqual(fun, 'function');
                },
                inArray: function(value, array, fromIndex){
                    return jQuery.inArray(value, array, fromIndex);
                }
            },

            utils: {
                trim: function(str){
                    return jQuery.trim(str);
                },

                fixupURL: function(url) {
                    if (!url)
                        return "";
                    if (!/^[\w\-\+]+\:\/\//.test(url))
                        url = "http://" + url;

                    if (/^[\w\-\+]+\:\/\/[^\/]*$/.test(url))
                        url += '/';

                    return url;
                },

                extend: function(target){

                    for (var i = 1; i < arguments.length; i++) {
                        var extension = arguments[i];
                        for (var key in extension)
                            if (extension.hasOwnProperty(key))
                                target[key] = extension[key];
                    }

                    return target;
                },

                toArray: function(list){
                    return Array.prototype.slice.call(list || [], 0);
                },

                decline: function(count, form1, form2, form3){

                    var cnt1 = count % 100,
                        cnt2 = cnt1 % 10,
                        cnt3 = (cnt1 - cnt2)/10,
                        res = 0;

                    if(cnt2 == 1 && cnt3 != 1){
                        res = 1;
                    } else if((cnt2 > 1 && cnt2 < 5) && cnt3 != 1){
                        res = 2;
                    }

                    if(res == 1){
                        return form2;
                    } else if(res == 2){
                        return form3;
                    } else {
                        return form1;
                    }
                }

            },

            storage: {
                get: function(key){
                    var value = localStorage.getItem(key);

                    try {
                        value = JSON.parse(value);
                    }
                    catch(ex){

                    }

                    return value;
                },

                set: function(key, value){

                    try{
                        value = JSON.stringify(value);
                    }catch(ex){

                    }

                    localStorage.setItem(key, value);
                },

                remove: function (key) {
                    localStorage.removeItem(key);
                },

                _getBookmarks: function() {
                    var bookmarks = [];
                    var key = 'visual-bookmarks.bookmarks';
                    var bookmarksData = this.get(key);

                    if(bookmarksData != null){

                        for (var index in bookmarksData) {
                            if (bookmarksData.hasOwnProperty(index)) {
                                bookmarksData[index].index = index;
                                bookmarks.push(bookmarksData[index]);
                            }
                        }

                        this.remove(key)
                    }

                    return bookmarks;
                },

                getBookmarks: function () {

                    var bookmarks = this._getBookmarks();

                    if(bookmarks.length !== 0) return bookmarks;

                    function isKeyBookmarkKey(key) {
                        return /^visual-bookmarks.bookmark_\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(key);
                    }

                    for (var key in localStorage) {
                        if (localStorage.hasOwnProperty(key) && isKeyBookmarkKey(key)) {
                            var bookmark = localStorage.getItem(key);

                            bookmark = JSON.parse(bookmark);
                            bookmarks.push(bookmark);
                        }
                    }

                    return bookmarks;
                },

                updateBookmark: function (name, options) {
                    var storageKey = 'visual-bookmarks.bookmark_' + name;
                    var bookmark = this.get(storageKey);

                    if (bookmark == null) {
                        return;
                    }

                    app.core.utils.extend(bookmark, options);
                    this.set(storageKey, bookmark);
                },

                getBookmark: function(name){
                    var storageKey = 'visual-bookmarks.bookmark_' + name;

                    return this.get(storageKey);
                }

            },
            messages: {
                on: function(message, handler){
                    if (chrome.extension.onMessage) {
                        chrome.extension.onMessage.addListener((function (message, handler) {
                            return function (request) {
                                if (request.message == message) handler(request.value);
                            }
                        })(message, handler));
                    } else {
                        chrome.extension.onRequest.addListener((function (message, handler) {
                            return function (request) {
                                if (request.message == message) handler(request.value);
                            }
                        })(message, handler));
                    }
                },
                send: function(msg, val){
                    var msgObj = {
                        message:msg,
                        value:val
                    };

                    if (chrome.extension.sendMessage) {
                        chrome.extension.sendMessage(msgObj);
                    } else if (chrome.extension.sendRequest) {
                        chrome.extension.sendRequest(msgObj);
                    }
                }
            }

        }
    }());

})(app);
