(function (app) {

    var SliderViewModel = function (options) {
        this.items = ko.observableArray(options.items || []);
        this.selectHandler  = options.select;
        this.leafHandler  = options.leaf;
        this.needRemoveBtn = options.removeButton;
        this.removeBtnClickHandler = options.removeBtnClickHandler;

        this.init = function () {
            this.$itemsContainer = $(options.elem);
            this.$itemsWindow = $('.themes__window', this.$itemsContainer);
            this.$itemsWrapper = $('.themes__wrapper', this.$itemsContainer);
            this.$previousArrow = $('.themes__arrow-left', this.$itemsContainer);
            this.$nextArrow = $('.themes__arrow-right', this.$itemsContainer);
            this.activeClassName = 'themes__theme-active';
            this.position = 0;
            this.slidingThumbsCount = 3;
            this.duration = 300 * this.slidingThumbsCount;
            this.adjustItemsWindowWidth();
            this.changeArrowsVisibility();

            if (options.activeValue) {
                this.selectActiveItem(options.activeValue);
                this.scrollIntoView();
            }

            window.addEventListener('resize', this.adjustItemsWindowWidth.bind(this), false);
            this.$itemsWindow.on('click', '.themes__theme', this.onSlideItemClick.bind(this));
        };

        this.updateItems = function(newItems){
            for(var i = 0; i < newItems.length; i++){
                this.items.push(newItems[i]);
            }
        };

        this.getActiveItem = function () {
            return $('.' + this.activeClassName, this.$itemsContainer);
        };

        this.selectActiveItem = function (value) {
            var $active = this.getActiveItem();

            $active.removeClass(this.activeClassName);
            $(".themes__theme[data-value='" + value + "']", this.$itemsContainer).addClass(this.activeClassName);
        };

        this.scrollIntoView = function () {
            var $active = this.getActiveItem();
            var index = $active.index();

            if(index == -1){
                return;
            }

            var maxPosition = this.getMaxPosition();

            this.position = Math.max( -index * this.itemWidth(), maxPosition);
            this.changeArrowsVisibility();
            this.$itemsWrapper.css({
                'marginLeft': this.position
            });

        };

        this.onSlideItemClick = function (event) {
            var $target = $(event.currentTarget);
            var value = $target.attr('data-value');

            this.selectActiveItem(value);

            if (this.selectHandler) {
                this.selectHandler(value);
            }
        };

        this.itemWidth = function () {

            if (!this._itemWidth) {
                this._itemWidth = $('.themes__theme:first', this.$itemsContainer).outerWidth(true)
            }

            return this._itemWidth;
        };

        this.adjustItemsWindowWidth = function () {
            var minMargin = 100;
            var itemsWindowWidth = this.$itemsWindow.outerWidth(true);
            var showItemsCount = Math.floor((itemsWindowWidth - 2 * minMargin) / this.itemWidth());
            var margins = itemsWindowWidth - showItemsCount * this.itemWidth();
            var margin = margins / 2;

            this.$itemsWindow.css({
                'margin-left':margin + 'px',
                'margin-right':margin + 'px'
            });
        };

        this.getMaxPosition = function () {
            var len = this.items().length;
            var themesWindowWidth = this.$itemsWindow.outerWidth();
            var themesWrapperWidth = len * this.itemWidth();

            return -themesWrapperWidth + themesWindowWidth;
        };

        this.changeArrowsVisibility = function () {
            if (this.position >= 0) {
                this.$previousArrow.hide();
            } else {
                this.$previousArrow.show();
            }

            var maxPosition = this.getMaxPosition();

            if (this.position <= maxPosition) {
                this.$nextArrow.hide();
            } else {
                this.$nextArrow.show();
            }
        };

        this.showNextItems = function () {
            var maxPosition = this.getMaxPosition();

            if (this.position <= maxPosition) {
                return false;
            }

            //листание тем
            this.leafHandler && this.leafHandler();

            this.position = Math.max(this.position - this.itemWidth() * this.slidingThumbsCount, maxPosition);
            this.changeArrowsVisibility();

            this.$itemsWrapper.animate({'marginLeft': this.position}, this.duration);

            return false;
        };

        this.showPreviousItems = function () {
            if (this.position >= 0) {
                return false;
            }

            //листание тем
            this.leafHandler && this.leafHandler();

            this.position = Math.min(this.position + this.itemWidth() * this.slidingThumbsCount, 0);
            this.changeArrowsVisibility();

            this.$itemsWrapper.animate({'marginLeft': this.position}, this.duration);

            return false;
        };

        this.removeItem = function(item) {
            this.items.remove(item);
        };

        this.callRemoveItemDialog = function(item, event) {
            this.removeBtnClickHandler(item.value, function(){
                this.removeItem(item);
            }.bind(this));
            event.stopPropagation();
        }.bind(this);

    };

    app.slider = {
        _model: null,
        init:function (options) {
            var elem = options.elem;
            this._model = new SliderViewModel(options);
            ko.applyBindings(this._model, elem);
            this._model.init();
        },
        updateItems: function(items){
            this._model.updateItems(items);
        }
    };

})(app);
