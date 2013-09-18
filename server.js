var http = require('http');
var express = require('express');
var _ = require('underscore');
var app = express();
var cons = require('consolidate');
var partials = require('express-partials');
var fs = require('fs');

var viewFiles;

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

viewFiles = fs.readdirSync('views');
console.log(viewFiles);

_.each(viewFiles, function(filename) {
    var prefix = filename.substring(0, filename.indexOf('.'));
    
    app.get('/'+prefix, function(req, res, next) {
        res.render(filename, {
            layout : 'layout.html'
        });
    });
});

app.listen(process.env.PORT || 9000);

process.on('uncaughtException', function(e) {
    console.log('Uncaught exception:' + e);
});