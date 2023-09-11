const app = require("../expressApp").app

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/v1/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});