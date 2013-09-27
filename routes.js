var Player = require('./models/player.js');
var League = require('./models/league.js');

exports.load = function(app) {
    app.post('/api/players', function(req, res, next) {
        Player.createPlayer(req, res);
    });
    
    app.post('/api/login', function(req, res, next) {
        Player.login(req, res);
    });
    
    app.post('/api/leagues', function(req, res, next) {
        League.createLeague(req, res);
    });
};