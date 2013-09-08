var http = require('http');
var express = require('express');
var _ = require('underscore');
var app = express();
var cons = require('consolidate');
var partials = require('express-partials');

app.set('views', __dirname + '/views');
app.engine('html', cons.underscore);
app.set('view engine', 'underscore');

app.use(express.static(__dirname + '/public')); 
app.use(app.router);
app.use(partials());

// Routes
app.get('/', function(req, res, next) {
    res.render('body.html', {
        layout : 'layout.html'
    });
});
app.get('/signin', function(req, res, next) {
    res.render('signin.html', {
        layout : 'layout.html'
    });
});
app.get('/register', function(req, res, next) {
    res.render('register.html', {
        layout : 'layout.html'
    });
});
app.get('/select_players', function(req, res, next) {
    res.render('select_players.html', {
        layout : 'layout.html'
    });
});

app.listen(process.env.PORT || 9000);

process.on('uncaughtException', function(e) {
    console.log('Uncaught exception:' + e);
});