var Player = require('./models/player.js');
var League = require('./models/league.js');
var Team = require('./models/team.js');
var Athlete = require('./models/athlete.js');
var async = require('async');

var BusinessLogic = {};

BusinessLogic.retrievePlayers = function(cb, user) {
    Player.getAllPlayers(function(players) {
        cb({
            'players' : players
        });
    });
};

BusinessLogic.retrieveLeagues = function(cb, user) {
    League.getAllLeagues(function(leagues) {
        cb({
            'leagues' : leagues
        });
    });
};

BusinessLogic.retrieveTeams = function(cb, user) {
    Team.getAllUserTeams(function(teams) {
        cb({
            'teams' : teams
        });
    }, user.id);
};

module.exports = BusinessLogic;
