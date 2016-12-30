var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hola Mundo!!');
});

// Load the APIs.
require('./api/sessions')(app);

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.info('Simply Chat APIs Started. Running on port ', port);
});