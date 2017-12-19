(function (app){

    app.config = {
        "debug": false,
        "bookmarks_count": 9,
        "fr": 'chvbm7.1.7',
        "variation": 'chvbm7.1.7',
        "default_bookmarks-update": 5,
        "update_period": 2 * 1440 * 60000,
		"product_id": localStorage.getItem('product_id') || '{unknown}',
        "statistics": {
            "drag_bookmarks": 1377662,
            "remove_bookmarks": 1341706,
            "go_bookmarks": 1341704,
            "add_bookmarks": 1341705,
            "update_bookmarks": 1341707,
            "search_suggest": 1341698,
            "search_button_click": 1341689,
            "search_enter_press": 1341699,
            "select_theme": 1341708,
            "select_default_theme": 1341709,
            "leaf_themes": 1341710,
            "traffic": 1341717
        },
        "default_bookmarks": [
            {
                index: 4,
                url:'https://vk.com',
                hiddenUrl:'http://r.mail.ru/clb19105826/vk.com',
                title:'ВКонтакте',
                background:'http://amigoimgs.cdnmail.ru/default/vk.png',
                ico:'chrome://favicon/https://vk.com',
                captureState:'received'
            },
            {
                index: 5,
                url:'http://ok.ru',
                hiddenUrl:'http://r.mail.ru/clb19105750/ok.ru',
                title:'Одноклассники',
                background:'http://amigoimgs.cdnmail.ru/default/ok.png',
                ico:'chrome://favicon/http://ok.ru',
                captureState:'received'
            }
        ],
        "themes":[
            { value:'body__bg-cookies',title:'Печень'},
            { value: 'amigo_1', title: 'Amigo 1', default: true },
            { value: 'skyforge_1', title: 'Skyforge 1' },
            { value: 'amigo_5', title: 'Amigo 5' },
            { value: 'legenda_2', title: 'Legenda 2' },
            { value: 'aw_1', title: 'AW 1' },
            { value: 'wf_3', title: 'WF 1' },
            { value: 'amigo_4', title: 'Amigo 4' },
            { value: 'amigo_2', title: 'Amigo 2' },
            { value: 'dj_1', title: 'DJ 1' },
            { value: 'amigo_3', title: 'Amigo 3' },
            { value: 'amigo_6', title: 'Amigo 6' },
            { value: 'skyforge_2', title: 'Skyforge 2' },
            { value: 'arche_age_1', title: 'arche_age 1' },
            { value: 'perfect_world_1', title: 'Perfect World 1' },
            { value: 'perfect_world_2', title: 'Perfect World 2' },
            { value: 'cross_fire_1', title: 'cross_fire_1' },
            { value: 'cross_fire_2', title: 'cross_fire_2' },
            { value: 'parapa_1', title: 'parapa_1' },
            { value: 'parapa_2', title: 'parapa_2' },
            { value: 'amigo_8', title: 'Amigo 8' },
            { value: 'threekingdoms_1', title: 'Three Kingdoms 1' },
            { value: 'threekingdoms_3', title: 'Three Kingdoms 3' },
            { value: 'legenda_4', title: 'Legenda 4' },

            {
                value:'body__bg-fabric',
                title:'Ткань'
            },
            {
                value:'body__bg',
                title:'Стандартная'
            },
            {
                value:'body__bg-11',
                title:'Зелень'
            },
            {
                value:'body__bg-12',
                title:'Дерево'
            },
            {
                value:'body__bg-2',
                title:'Кожа'
            },
            {
                value:'body__bg-mosaic',
                title:'Мозаика'
            },
            {
                value:'body__bg-9',
                title:'Шиповник'
            },
            {
                value:'body__bg-8',
                title:'Ромбы'
            },
            {
                value:'body__bg-1',
                title:'Волны'
            },
            {
                value:'body__bg-5',
                title:'Волны'
            },
            {
                value:'body__bg-4',
                title:'Зимняя'
            },
            {
                value:'body__bg-3',
                title:'Леденцы'
            },
            {
                value:'body__bg-6',
                title:'Листва'
            },
            {
                value:'body__bg-7',
                title:'Подсолнухи'
            },
            {
                value:'body__bg-10',
                title:'Домики'
            },
            {
                value:'body__bg-13',
                title:'Сладости'
            },
            {
                value:'body__bg-14',
                title:'Светлое дерево'
            },
            {
                value:'body__dark',
                title:'Тёмная'
            },
            {
                value:'body__bg-wall',
                title:'Стена'
            },
            {
                value:'body__bg-flax',
                title:'Лён'
            }
        ]
    };

})(app);
