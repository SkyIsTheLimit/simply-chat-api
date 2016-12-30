var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send('Hola Mundo!!');
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.info('Simply Chat APIs Started. Running on port ', port);
});