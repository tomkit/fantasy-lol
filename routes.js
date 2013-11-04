var Player = require('./models/player.js');
var League = require('./models/league.js');
var Team = require('./models/team.js');
var GameResult = require('./models/gameresult.js');
var Athlete = require('./models/athlete.js');
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
    
    app.post('/api/athletes', function(req, res, next) {
        Athlete.createAthlete(req, res);
    });
    
    app.post('/api/gameresults', function(req, res, next) {
        GameResult.createGameResult(req, res);
    });
    
    app.post('/api/teams/:team_id', function(req, res, next) {
        var teamId = req.param('team_id');
        Team.updateTeam(req, res);
        
        res.redirect('/teams/'+teamId);
    });
    
    app.get('/api/logout', function(req, res, next) {
        console.log('logged out');        
        req.logout();
        req.session.destroy();
        console.log(req.user);
        
        res.redirect('/');
    });
};