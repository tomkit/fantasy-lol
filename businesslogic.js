var Player = require('./models/player.js');
var League = require('./models/league.js');
var Team = require('./models/team.js');
var Athlete = require('./models/athlete.js');
var async = require('async');

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

BusinessLogic.retrieveAthletesAndTeam = function(cb) {
//    async.parallel([
//                    function(cb1) {
//                        Team.getAllMembers(function(members) {
//                            cb1(null, members);
//                        });
//                    },
//                    function(cb2) {
//                        Athlete.getAllAthletes(function(athletes) {
//                            cb2(null, athletes);
//                        });
//                    }], function(err, results) {
//                        
//                    });
    cb({
        'team' : [],
        'athletes' : []
    });
};

module.exports = BusinessLogic;
