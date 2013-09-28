var http = require('http');
var express = require('express');
var _ = require('underscore');
var app = express();
var cons = require('consolidate');
var partials = require('express-partials');
var fs = require('fs');
var routes = require('./routes.js');
var utils = require('./utils/utils.js');
var datalayer = require('./datalayer.js');
var BusinessLogic = require('./businesslogic.js');
var viewFiles;

app.set('views', __dirname + '/views');
app.engine('html', cons.underscore);
app.set('view engine', 'underscore');

app.use(express.static(__dirname + '/public')); 
app.use(express.bodyParser());
app.use(utils.extractParams);
app.use(app.router);

app.use(partials());

// Routes
app.get('/', function(req, res, next) {
    res.render('body.html', {
        layout : 'layout.html'
    });
});

routes.load(app);

var additionalBusinessLogic = {
    'players' : BusinessLogic.retrievePlayers,
    'leagues' : BusinessLogic.retrieveLeagues,
    'team' : BusinessLogic.retrieveAthletesAndTeam
};

viewFiles = fs.readdirSync('views');
_.each(viewFiles, function(filename) {
    var prefix = filename.substring(0, filename.indexOf('.'));
    
    app.get('/'+prefix, function(req, res, next) {
        var loggedInUser = req.user || {
            id : -1
        };
        
        if(additionalBusinessLogic[prefix]) {
            additionalBusinessLogic[prefix](function(json) {
                
                console.log('rendering:');
                console.log(req.user);
                
                res.render(filename, _.extend({
                    layout : 'layout.html',
                    user_id : loggedInUser.id
                }, json));
            });
        } else {
            res.render(filename, _.extend({
                layout : 'layout.html',
                user_id : loggedInUser.id
            }));
        }
    });
});

app.listen(process.env.PORT || 9000);

process.on('uncaughtException', function(e) {
    console.log('Uncaught exception:' + e);
});