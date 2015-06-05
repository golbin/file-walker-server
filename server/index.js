#!/usr/bin/env node

var path = require('path');

var express = require('express'),
    bodyParser = require('body-parser');

var app = express(),
    routes = require('./routes.js');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/file-walker-server-static', express.static(path.join(__dirname, '../public')));

app.use('/', routes);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
