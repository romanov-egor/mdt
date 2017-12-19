(function(app){

    app.core.define('#themes', function(f){
        var slider, background, themes;

        return {
            init:function () {
                var elem = f.getEl();

                themes = f.config('themes');

                if (!themes) return;

                f.addClass(elem, 'themes__container');
                f.setAttribute(elem, "data-bind", "template: {name: 'slider-template'}");
                background = f.getBackground() || this.getDefaultTheme();
                this.applyTheme(background, true);

                this.prepareThemesData(themes);
                slider = Object.create(app.slider);
                slider.init({
                    elem: elem,
                    items: themes,
                    select: this.applyTheme.bind(this),
                    leaf: this.leafTheme.bind(this),
                    activeValue: background
                });
            },

            destroy:function () {
                slider = null;
            },

            getDefaultTheme: function() {
                var defaultTheme = themes.filter(function(theme){
                    return theme.default;
                })[0] || themes[0];

                return defaultTheme.value;
            },

            applyTheme: function (background, init) {
                f.setBackground(background);

                if (init) {
                    return f.sendStatsToMRDS({ type: 'def_fon', id: background });
                }

                f.sendStats("select_theme");
                f.sendStatsToMRDS({ type: 'click_preview', id: background });

                if (background == 'body__bg') {
                    f.sendStats("select_default_theme");
                }
            },

            leafTheme: function() {
                f.sendStats("leaf_themes");
            },

            prepareThemesData: function (data) {
                data.forEach(function (item) {
                    f.extend(item, {
                        'className': item.value
                    });
                });
            }

        }

    });

})(app);




