var Player = require('./models/player.js');
var League = require('./models/league.js');
var Team = require('./models/team.js');
var Athlete = require('./models/athlete.js');
var async = require('async');

var BusinessLogic = {};

BusinessLogic.player = function(cb, user, resource, resourceId) {
    Player.getPlayer(function(player) {
        cb({
            'player' : player
        });
    }, user.id, resourceId);
};

BusinessLogic.players = function(cb, user) {
    Player.getAllPlayers(function(players) {
        cb({
            'players' : players
        });
    });
};

BusinessLogic.leagues = function(cb, user) {
    League.getAllLeagues(function(leagues) {
        cb({
            'leagues' : leagues
        });
    });
};

BusinessLogic.team = function(cb, user, resource, resourceId) {
    console.log('getting team');
    Team.getTeam(function(team) {
        cb({
            'team' : team
        });
    }, user.id, resourceId);
};

BusinessLogic.teams = function(cb, user, resource, resourceId) {
    console.log('getting teams');
    Team.getAllUserTeams(function(teams) {
        cb({
            'teams' : teams
        });
    }, user.id);
};

module.exports = BusinessLogic;
