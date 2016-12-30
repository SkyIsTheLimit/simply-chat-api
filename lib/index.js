var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json({
        message: 'Welcome to Simply Chat API Server',
        version: '0.0.1'
    });
});

// Load the APIs.
require('./api/sessions')(app);

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.info('Simply Chat APIs Started. Running on port ', port);
});