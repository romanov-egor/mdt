(function(app){

    app.core.define('remove_app-dialog', function(f){

        var DialogViewModel = function (dialog, appId, success) {
                this.text = 'Вы действительно хотите удалить приложение?';
                this.accept = function () {
                    success();
                    dialog.close();
                    f.publish({
                        type:'uninstall-app',
                        data:[appId]
                    });
                };

                this.cancel = function () {
                    dialog.close();
                };
            },

            openRemoveDialog = function (appId, success) {

                var dialog = f.dialog({
                        content:{
                            "data-bind": "template: {name: 'remove-dialog'}"
                        }
                    }, "remove"),
                    view = new DialogViewModel(dialog, appId, success);

                ko.applyBindings(view, dialog.elem);

            }


        return {
            init:function () {
                f.subscribe({
                    'remove_app-dialog':openRemoveDialog
                });
            },

            destroy:function () {
                f.unsubscribe({
                    'remove-dialog_app':openRemoveDialog
                });
            }

        }

    });

})(app);




