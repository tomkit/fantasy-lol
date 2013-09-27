var Player = require('./models/player.js');

exports.load = function(app) {
    app.post('/api/players', function(req, res, next) {
        Player.createPlayer(req, res);
    });
    
    app.post('/api/login', function(req, res, next) {
        Player.login(req, res);
    });
};