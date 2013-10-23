var Player = require('./models/player.js');
var League = require('./models/league.js');
var Team = require('./models/team.js');
var passport = require('passport');

exports.load = function(app) {
    app.post('/api/players', function(req, res, next) {
        Player.createPlayer(req, res);
    });
    
    app.post('/api/login', passport.authenticate('local', {
        successRedirect : '/main',
        failureRedirect : '/signin',
        failureFlash : true
    }));
    
    app.post('/api/leagues', function(req, res, next) {
        League.createLeague(req, res);
    });
    
    app.post('/api/teams', function(req, res, next) {
        Team.updateTeam(req, res);
        
        res.send(true);
    });
    
    app.get('/api/logout', function(req, res, next) {
        console.log('logged out');        
        req.logout();
        req.session.destroy();
        console.log(req.user);
        
        res.redirect('/');
    });
};