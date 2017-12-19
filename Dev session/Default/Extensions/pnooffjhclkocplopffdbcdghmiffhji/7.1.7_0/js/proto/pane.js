(function (app) {

    var Pane = function() {
        var self = this;
        var storageKey = 'visual-bookmarks.pane.active';
        this.active = ko.observable();

        restoreState();

        this.activate = function () {
            if( !this.active() ){
                this.toggle();
            }
        };

        this.toggle = function() {
            this.active(!this.active());
            saveState();

            $('.container__padding').height(this.active() ? 131 : 31);

            if (this.active()) {
                document.body.scrollTop += 100;
            }
        };

        this.showHistory = function() {
            chrome.tabs.create({
                url: 'chrome://history/'
            });
        };

        function saveState() {
            app.core.storage.set(storageKey, self.active());
        }

        function restoreState() {
            var active = app.core.storage.get(storageKey);

            self.active(typeof active == 'boolean' ? active : true);
            $('.container__padding').height(self.active() ? 131 : 31);
        }
    }

    app.Pane = Pane;

})(app);

