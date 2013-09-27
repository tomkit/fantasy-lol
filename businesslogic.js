var Player = require('./models/player.js');

var BusinessLogic = {};

BusinessLogic.retrievePlayers = function(cb) {
    
    Player.getAllPlayers(function(players) {
        cb({
            'players' : players
        });
    });
};

module.exports = BusinessLogic;
