var Player = require('./models/player.js');
var League = require('./models/league.js');
var Team = require('./models/team.js');
var Athlete = require('./models/athlete.js');
var async = require('async');

var BusinessLogic = {};

BusinessLogic.player = function(cb, user, resource, resourceId ) {
    Player.getPlayer(function(player) {
        cb({
            'player' : player
        });
    }, resourceId);
};

BusinessLogic.players = function(cb, user) {
    Player.getAllPlayers(function(players) {
        cb({
            'players' : players
        });
    });
};

BusinessLogic.league = function(cb, user, resource, resourceId) {
    console.log(resource);
    console.log(resourceId);
    League.getLeague(function(league) {
        cb({
            'league' : league
        });
    }, resourceId);
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
    
    async.parallel([function(parallelCB) {
        Team.getTeam(function(team) {
            Team.getTeams(function(teams) {
                
                parallelCB(null, {
                    team: team,
                    teams: teams
                });
            }, team.league_id);
            
            
        }, user.id, resourceId);
    }, function(parallelCB) {
        Athlete.getAllAthletes(function(athletes) {
            parallelCB(null, athletes);
        });
    }], function(err, results) {
        cb({
            'team' : results[0].team,
            'teams' : results[0].teams,
            'athletes' : results[1]
        });
    });
};

BusinessLogic.teams = function(cb, user, resource, resourceId) {
    console.log('getting teams');
    Team.getAllUserTeams(function(teams) {
        cb({
            'teams' : teams
        });
    }, user.id);
};

BusinessLogic.athlete = function(cb, user, resource, resourceId) {
    Athlete.getAthlete(function(athlete) {
        cb({
            'athlete' : athlete
        });
    }, user.id, resourceId);
};

BusinessLogic.athletes = function(cb, user) {
    Athlete.getAllAthletes(function(athletes) {
        cb({
            'athletes' : athletes
        });
    });
};

module.exports = BusinessLogic;
