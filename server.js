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

var REDIS_HOST = process.env.REDISTOGO_URL ? process.env.REDISTOGO_URL.substring(0, process.env.REDISTOGO_URL.length-6) : 'localhost';
var REDIS_PORT = process.env.REDISTOGO_URL ? parseInt(process.env.REDISTOGO_URL.split(':')[3].substring(0,4), 10) : 6379;

console.log(REDIS_HOST + REDIS_PORT + '');

app.set('views', __dirname + '/views');
app.engine('html', cons.underscore);
app.set('view engine', 'underscore');

app.use(express.cookieParser());
app.use(express.session({
    secret: "sdfjklsjlfksdjfkldjslfjlksdjfljsdlkfjsdklfjsdljflksjdflksd",
    store: new RedisStore({ 
        host: REDIS_HOST, 
        port: REDIS_PORT 
    })
}));
app.use(express.static(__dirname + '/public')); 
app.use(express.bodyParser());
app.use(utils.extractParams);
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(partials());

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

var additionalBusinessLogic = {
    'players' : BusinessLogic.retrievePlayers,
    'leagues' : BusinessLogic.retrieveLeagues,
    'team' : BusinessLogic.retrieveAthletesAndTeam,
    'logout' : BusinessLogic.logout,
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