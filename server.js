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
var RedisStore = require('connect-redis')(express);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Player = require('./models/player.js');
var RenderHelper = require('./renderhelper.js');
var renderHelper = new RenderHelper();
var viewFiles;

app.engine('html', cons.underscore);

app.set('views', __dirname + '/views');
app.set('view engine', 'underscore');

app.use(express.cookieParser());
if(process.env.REDISTOGO_URL) {
    console.log('redis2go');
    app.use(express.session({
        secret: "sdfjklsjlfksdjfkldjslfjlksdjfljsdlkfjsdklfjsdljflksjdflksd",
        store: new RedisStore({ 
            host: 'koi.redistogo.com', 
            port: 9867,
            pass: '24f2fdb9e50b2dd8fcf1e124c138eb85',
            user: 'redistogo',
            username: 'redistogo'
        })
    }));
} else {
    app.use(express.session({
        secret: "sdfjklsjlfksdjfkldjslfjlksdjfljsdlkfjsdklfjsdljflksjdflksd",
        store: new RedisStore({ 
            host: 'localhost', 
            port: 6379 
        })
    }));
}

app.use(partials());
app.use(express.static(__dirname + '/public')); 
app.use(express.bodyParser());
app.use(utils.extractParams);
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);


passport.use(new LocalStrategy(
    function(username, password, done) {
        Player.localLogin(function(err, player) {
            console.log('LocalStrategy');
            console.log(err);
            console.log(player);
            if(err) { return done(err); }
            if(!player) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if(!player.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, player);
        }, username);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Player.findById(id, function(err, user) {
        done(err, user);
    });
});

// Routes
app.get('/', function(req, res, next) {
    res.render('body.html', {
        layout : 'layout.html',
        renderHelper : renderHelper
    });
});

routes.load(app);

viewFiles = fs.readdirSync('views');
adminFiles = fs.readdirSync('views/admin');
//console.log(viewFiles);
//console.log(adminFiles);
function registerGet(req, res, resource, filename, resourceId) {
    var loggedInUser = req.user || {
        id : -1
    };
//    console.log('uri:'+uri);
    console.log('filename:'+filename);
    console.log(BusinessLogic[resource]);
    if(BusinessLogic[resource]) {
        BusinessLogic[resource](function(json) {
            
            console.log('rendering:');
//            console.log(json);
            res.render(filename, _.extend({
                layout : 'layout.html',
                user_id : loggedInUser.id,
                renderHelper : renderHelper
            }, json));
        }, req.user, resource, resourceId);
    } else {
        res.render(filename, _.extend({
            layout : 'layout.html',
            user_id : loggedInUser.id,
            renderHelper : renderHelper
        }));
    }
}

function registerGets(uri, resource, filename) {
    
    console.log('registering:'+uri);
    app.get(uri, function(req, res) {
        var updatedFilename = '.'+uri+'.html';
        registerGet(req, res, resource, updatedFilename);
    });
    
    console.log('registering:'+uri+'/:resourceId');
    app.get(uri+'/:resourceId', function(req, res) {
        var resourceId = req.param('resourceId');
        console.log(uri);
        var singularResource = resource.substring(0, resource.length-1);
        var singularFilename = '.'+uri.substring(0, uri.length-1)+'.html';
//        console.log('resourceid');
        console.log(singularFilename);
        registerGet(req, res, singularResource, singularFilename, resourceId);
    });
}
_.each(viewFiles, function(filename) {
    if(filename.indexOf('.') > -1) {
        var resource = filename.substring(0, filename.indexOf('.'));
        var uri = '/'+resource;
        registerGets(uri, resource, filename);
    }
});
_.each(adminFiles, function(filename) {
    if(filename.indexOf('.') > -1) {
        var resource = filename.substring(0, filename.indexOf('.'));
        var uri = '/admin/'+resource;
        registerGets(uri, resource, filename);
    }
});

app.listen(process.env.PORT || 9000);

process.on('uncaughtException', function(e) {
    console.log('Uncaught exception:' + e, e.stack);
});