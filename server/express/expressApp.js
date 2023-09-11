const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Create Express app
const app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api/v1', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});



exports.app = app

exports.Router = (path) => {
    const router = express.Router()
    app.use(path, router)
    
    return router
}