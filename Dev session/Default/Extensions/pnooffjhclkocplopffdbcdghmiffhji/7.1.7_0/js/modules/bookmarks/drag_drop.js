(function(app){

    app.core.define('drag-drop', function(f){
        var initCell;
        var freeCell;
        var initCellChip;
        var initCellModel;

        function moveElem(elem, parent) {
            if (arguments.length < 2) {
                return;
            }

            var $elem = $(elem);

            if ($elem.parent()[0] != parent) {
                var $parent = $(parent);
                var elemOffset = $elem.offset();
                var elemPosition = $elem.position();
                var left = elemOffset.left;
                var top = elemOffset.top;

                $parent.append($elem);

                elemOffset = $elem.offset();
                left = left - elemOffset.left + elemPosition.left;
                top = top - elemOffset.top + elemPosition.top;

                $elem.css({
                    left:left,
                    top:top
                });
            }

            $elem.animate({
                left:0,
                top:0
            }, 200);
        };

        function replaceDataItems (data, item1, item2) {
            var item1Index = data.indexOf(item1);
            var item2Index = data.indexOf(item2);

            data.splice(item1Index, 1, item2);
            data.splice(item2Index, 1, item1);
        }

        return {
            init:function () {

                ko.bindingHandlers.drop = {
                    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                        $(element).droppable({
                            over: function (event, ui) {
                                var target = event.target;

                                if (target != initCell) {
                                    var slide = $('.slide__container:not(.ui-draggable-dragging)', target)[0];

                                    if (!slide) {
                                        return;
                                    }

                                    moveElem(slide, initCell);
                                } else if (!initCellChip) {
                                    return;
                                }

                                if (initCellChip) {
                                    moveElem(initCellChip, freeCell);
                                }

                                freeCell = target;
                                initCellChip = slide;
                                initCellModel = viewModel;
                            }
                        });
                    }
                };

                ko.bindingHandlers.drag = {
                    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                        var $element = $(element);

                        if ( valueAccessor () ) {
                            $element.draggable({
                                zIndex: 999,
                                start: function (event, ui) {
                                    freeCell = initCell = $(this).parent()[0];
                                },
                                stop: function(event, ui) {
                                    moveElem(this, freeCell);

                                    if (initCellModel) {
                                        var index = viewModel.index();
                                        var initIndex = initCellModel.index();

                                        initCellModel.index(index);
                                        viewModel.index(initIndex);
                                        f.sendStats("drag_bookmarks");
                                    }

                                    initCell = freeCell = initCellChip = initCellModel = null;
                                }
                            });
                        } else if ($element.data('draggable')) {
                            $element.draggable('destroy');
                        }
                    }
                };

            },

            destroy:function () {

            }

        }

    });

})(app);




