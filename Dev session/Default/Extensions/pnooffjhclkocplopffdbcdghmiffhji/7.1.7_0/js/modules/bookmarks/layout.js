(function (app) {

    app.core.define('#bookmarks', function (f) {
        var grid,
            rowCount = 3,
            columnCount = 4,
            updatePeriod = f.config("update_period"),
            CAPTURE_STATE_RECEIVED = 'received',
            CAPTURE_STATE_REQUESTED = 'requested';


        var BookmarkModel = function (options) {
            var self = this;
            options = options || {};
            options.name = options.name || f.newGUID();
            options.ts = options.ts || f.getTimestamp();
            options.captureState = options.captureState || CAPTURE_STATE_RECEIVED;

            this.ts = ko.observable();
            this.name = ko.observable();
            this.url = ko.observable();
            this.hiddenUrl = ko.observable();
            this.title = ko.observable();
            this.background = ko.observable();
            this.index = ko.observable();
            this.captureState = ko.observable();
            this.statCounterId = ko.observable();

            fillValues(options);

            this.storageKey = ko.computed(function () {
                return 'visual-bookmarks.bookmark_' + this.name();
            }, this);

            this.isEmpty = ko.computed(function () {
                return !this.url();
            }, this);

            this.dataSync = function() {
                var data = {}, dataItem;

                for (var key in self) {
                    dataItem = self[key];

                    if (isObservable(dataItem) && dataItem() != null) {
                        data[key] = dataItem();
                    }
                }

                f.setStorageItem(self.storageKey(), data);
            }

            if (!inStorage() && !this.isEmpty()) {
                this.dataSync();
            }

            needThumbnailAsync(function(res) {
                if (res) {
                    setTimeout(requestThumbnail, self.index() * 200);
                }
            });

            this.setEmpty = function () {
                fillValues({
                    url:null,
                    hiddenUrl:null,
                    title:null,
                    background:null,
                    statCounterId:null,
                    ts:null
                });
                f.removeThumbnail(self.name());
            };

            this.label = ko.computed(function () {
                var label,
                    title = this.title(),
                    url = this.url();

                if (title || url) {
                    label = (title ? title + ' — ' : '') + url;
                }

                return label;
            }, this);

            this.icoSource = ko.computed(function () {
                return this.url() && 'url(chrome://favicon/' + this.url() + ')';
            }, this);

            this.backgroundSource = ko.computed(function () {
                return this.background() && 'url(' + this.background() + ')';
            }, this);

            this.onClick = function () {
                if (self.url() == null) {
                    return false;
                }

                f.sendStats("go_bookmarks");

                if (propBeginsWithHttp('url')) {
                    return true;
                } else {
                    chrome.tabs.update({url:self.url()});
                }
            };

            function inStorage() {
                return f.getStorageItem(self.storageKey()) != null;
            }

            function fillValues(options) {
                for (var key in options) {
                    if (options.hasOwnProperty(key) && isObservable(self[key])) {
                        self[key](options[key]);
                    }
                }
            }

            function needThumbnail() {
                return !self.isEmpty() && !propBeginsWithHttp('background') &&
                       (self.captureState() == CAPTURE_STATE_REQUESTED ||
                       ((f.getTimestamp() -  self.ts()) > updatePeriod ));
            }

            function needThumbnailAsync(callback) {
                if (!self.background()) {
                    return callback(false);
                }

                var path = self.background().split('/');
                var filename = path[path.length - 1];

                if (!self.isEmpty() && !propBeginsWithHttp('background')) {
                    if (self.captureState() == CAPTURE_STATE_REQUESTED || (f.getTimestamp() -  self.ts()) > updatePeriod) {
                        return callback(true);
                    } else {
                        f.thumbnailExists(filename, function(exists) {
                            return callback(!exists);
                        });
                    }
                }

                callback(false);
            }

            function isObservable(data) {
                return ko.isObservable(data) && !ko.isComputed(data);
            }

            function onStorageUpdate(event) {
                if (event.key == self.storageKey()) {
                    var data = JSON.parse(event.newValue);

                    fillValues(data);
                }
            }

            function requestThumbnail(){
                f.sendMessage('request-thumbnail', {
                    url:self.url(),
                    requestGUID:self.name()
                });

                self.captureState(CAPTURE_STATE_REQUESTED);
                self.hiddenUrl(null);
                self.dataSync();
            }

            function propBeginsWithHttp(property) {
                return self[property]().indexOf('http') == 0;
            }

            function onUrlUpdate(url) {
                if (url == null) {
                    f.removeStorageItem(self.storageKey());
                } else {
                    if (propBeginsWithHttp('url')) {
                        requestThumbnail();
                        self.background('images/loading.gif');
                    } else {
                        self.background('images/no_photo.png');
                        self.hiddenUrl(null);
                    }

                    self.dataSync();
                }
            }

            function onModelUpdate() {
                if (self.url() != null) {
                    self.dataSync();
                }
            }

            this.url.subscribe(onUrlUpdate);
            this.index.subscribe(onModelUpdate);
            this.title.subscribe(onModelUpdate);
            window.addEventListener('storage', onStorageUpdate, false);

        };
        app.BookmarkModel = BookmarkModel;

        var GridViewModel = function (columnCount, rowCount, bookmarkInstances) {
            this.columnCount = ko.observable(columnCount);
            this.rowCount = ko.observable(rowCount);
            this.data = ko.observableArray([]);

            var len = this.columnCount() * this.rowCount();
            
            for (var index = 0; index < len; index++) {
                var instance = bookmarkInstances[index] || new BookmarkModel();

                instance.index(index);
                this.data.push(instance);
            }

            this.getData = (function () {

                var rows = [];
                var step = this.columnCount();
                var data = this.data();
                var len = data.length;
                
                for (var i = 0; i < len; i += step) {
                    if (i == 0) {
                        rows.push(data.slice(i, i + 2));
                    } else {
                        rows.push(data.slice(i, i + step));
                    }
                }

                return rows;
            }).bind(this)();

            this.dataTemplateName = function (bookmarkInstance, contextData) {
                var template,
                    data = contextData.$root.data(),
                    index = data.indexOf(bookmarkInstance);
            
                if (index == 0) {
                    return 'menu-template';
                }
                
                if (index == 1) {
                    return 'news-template';
                }
                
                return 'bookmark-template';
            };

            this.callEditDialog = function (bookmarkModel, event) {
                f.publish({
                    type:'edit-dialog',
                    data:[bookmarkModel]
                });
                event.stopPropagation();
            };

            this.callRemoveDialog = function (bookmarkModel, event) {
                f.publish({
                    type:'remove-dialog',
                    data:[bookmarkModel]
                });
                event.stopPropagation();
            };
        };

        function createBookmarkInstances(bookmarks) {
            var instances = {};
            
            for (var i = 0; i < bookmarks.length; i++) {
                var instance = new BookmarkModel(bookmarks[i]);

                instances[instance.index()] = instance;
            }

            app.updates.run(instances);

            return instances;
        }

        return {
            init:function () {
                var bookmarkData = f.getBookmarks();
                var bookmarkInstances = createBookmarkInstances(bookmarkData);

                grid = new GridViewModel(columnCount, rowCount, bookmarkInstances);
                ko.applyBindings(grid, f.getEl());

            },

            destroy:function () {
                grid = null;
            }

        }

    });

})(app);
