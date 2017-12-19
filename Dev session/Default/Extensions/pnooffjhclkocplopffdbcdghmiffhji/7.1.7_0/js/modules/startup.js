(function(app) {
	app.core.define('startup-metric', function(f) {
        return {
            init: function() {
            	f.sendStatsToMRDS({ type: 'open_ntp' });
            },
            destroy: function() {

            }
        };
    });
})(app);