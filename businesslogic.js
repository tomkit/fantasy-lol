var Player = require('./models/player.js');
var League = require('./models/league.js');

var BusinessLogic = {};

BusinessLogic.retrievePlayers = function(cb) {
    
    Player.getAllPlayers(function(players) {
        cb({
            'players' : players
        });
    });
};

BusinessLogic.retrieveLeagues = function(cb) {
  
    League.getAllLeagues(function(leagues) {
        cb({
            'leagues' : leagues
        });
    });
};

module.exports = BusinessLogic;
