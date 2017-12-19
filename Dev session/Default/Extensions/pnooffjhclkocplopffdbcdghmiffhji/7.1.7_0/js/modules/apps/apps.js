(function (app) {

    app.core.define('#apps', function (f) {
        var slider, apps = [];

        return {
            init:function () {
                var elem = f.getEl();

                f.subscribe({
                    'uninstall-app': this.uninstallApp
                });

                f.addClass(elem, 'themes__container');
                f.setAttribute(elem, "data-bind", "template: {name: 'slider-template'}");
                slider = Object.create(app.slider);
                slider.init({
                    elem: elem,
                    items: apps,
                    select: this.launchApp,
                    removeButton: true,
                    removeBtnClickHandler: this.callRemoveDialog
                });

                chrome.management.getAll(this.onAppRetrieved.bind(this));

            },

            destroy:function () {
                f.unsubscribe({
                    'uninstall-app': this.uninstallApp
                });
                slider = null;
            },

            onAppRetrieved: function (data) {
                var appData = this.prepareAppData(data);

                slider.updateItems(appData);
            },

            callRemoveDialog: function(appId, success) {
                f.publish({
                    type:'remove_app-dialog',
                    data:[appId, success]
                });
            },

            prepareAppData: function (data) {
                var appData = data.filter(function (item) {
                    return item.isApp;
                }).map(function (app) {
                        var icons =  app.icons || [{
                            size: 128,
                            url: 'chrome://extension-icon/' + app.id + '/128/1'
                        }];
                        var icons = icons.filter(function (icon) {
                        return icon.size == 128;
                    });

                    return {
                        title: app.name,
                        value: app.id,
                        style: { backgroundImage: 'url(" ' +  icons[0].url + '")'}
                    }
                });

                return appData;
            },

            launchApp: function (appId) {
                appId && chrome.management.launchApp(appId);
            },

            uninstallApp: function(appId) {
                appId && chrome.management.uninstall(appId);
            }

        }

    });

})(app);