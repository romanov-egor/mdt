(function (app) {

    app.tabStrip = {
        activeClassName: 'active',
        storageKey: 'visual-bookmarks.tab-strip.active',

        init: function (elem) {
            this.$elem = $(elem);
            this.$elem.on("click", "li", this.onClick.bind(this));
            this.restoreState();
        },

        onClick: function (event) {
            var $active = this.$elem.find('> .active');
            var $target = $(event.currentTarget);

            this.deactivate($active);
            this.activate($target);
            return false;
        },

        getSelector: function ($tab) {
            return $tab.find('a').attr('href');
        },

        activate: function ($tab) {
            var selector = this.getSelector($tab);

            $tab.addClass(this.activeClassName);
            $(selector).addClass(this.activeClassName);

            this.saveState(selector);
        },

        deactivate: function ($tab) {
            var selector = this.getSelector($tab);

            $tab.removeClass(this.activeClassName);
            $(selector).removeClass(this.activeClassName);
        },

        saveState: function(selector) {
            app.core.storage.set(this.storageKey, selector);
        },

        restoreState: function() {
            var $tabs = $('li:has(a[href])', this.$elem);

            if ($tabs.length == 0) {
                return;
            }

            var activeSelector = app.core.storage.get(this.storageKey) || $tabs.find('a[href]:first').attr('href');

            $tabs.each(function(index, item) {
                var $item = $(item);

                $item.has('a[href=' + activeSelector + ']').length === 0 ? this.deactivate($item) : this.activate($item);
            }.bind(this));
        }

    };

})(app);
