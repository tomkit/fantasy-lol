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
        layout : 'layout.html'
    });
});

routes.load(app);

viewFiles = fs.readdirSync('views');
function registerGet(req, res, prefix, filename, resourceId) {
    var loggedInUser = req.user || {
        id : -1
    };
    console.log(prefix);
    
    if(BusinessLogic[prefix]) {
        BusinessLogic[prefix](function(json) {
            
            console.log('rendering:');
            console.log(req.user);
            
            res.render(filename, _.extend({
                layout : 'layout.html',
                user_id : loggedInUser.id
            }, json));
        }, req.user, prefix, resourceId);
    } else {
        res.render(filename, _.extend({
            layout : 'layout.html',
            user_id : loggedInUser.id
        }));
    }
}
_.each(viewFiles, function(filename) {
    var prefix = filename.substring(0, filename.indexOf('.'));
    
    app.get('/'+prefix, function(req, res) {
        registerGet(req, res, prefix, filename);
    });
    
    app.get('/'+prefix+'/:resourceId', function(req, res) {
        var resourceId = req.param('resourceId');
        console.log('resourceid');
        registerGet(req, res, prefix.substring(0, prefix.length-1), filename.replace('s.', '.'), resourceId);
    });
});

app.listen(process.env.PORT || 9000);

process.on('uncaughtException', function(e) {
    console.log('Uncaught exception:' + e, e.stack);
});