var app = app || {};

window.onload = function(){
    var paneEl = $('#pane-container')[0];
    ko.applyBindings({pane: new app.Pane()}, paneEl);

    var tab = Object.create(app.tabStrip);
    tab.init($('#tab')[0]);

    app.core.startAll();

		//$('#search__form__rfr').attr('value', localStorage.rfr);

		try {
			chrome.extension.SetFocusOnTabContent(function(){
					console.log("SetFocusOnTabContent");
					document.getElementById('q').focus();
			});
		} catch (e)
		{ }
};





