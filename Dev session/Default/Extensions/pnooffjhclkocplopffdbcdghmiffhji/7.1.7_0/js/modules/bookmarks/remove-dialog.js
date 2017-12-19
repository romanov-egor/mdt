(function(app){

    app.core.define('remove-dialog', function(f){

        var DialogViewModel = function (dialog, bookmarkInstance) {
                this.text = 'Вы действительно хотите удалить закладку?';
                this.accept = function () {
                    bookmarkInstance.setEmpty();
                    dialog.close();
                    f.sendStats("remove_bookmarks");
                };

                this.cancel = function () {
                    dialog.close();
                };
            },

            openRemoveDialog = function (bookmarkModel) {

                var dialog = f.dialog({
                        content:{
                            "data-bind": "template: {name: 'remove-dialog'}"
                        }
                    }, "remove"),
                    view = new DialogViewModel(dialog, bookmarkModel);

                ko.applyBindings(view, dialog.elem);

            }


        return {
            init:function () {
                f.subscribe({
                    'remove-dialog':openRemoveDialog
                });
            },

            destroy:function () {
                f.unsubscribe({
                    'remove-dialog':openRemoveDialog
                });
            }

        }

    });

})(app);



