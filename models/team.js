//Test Change

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var _ = require('underscore');

var teamSchema = new mongoose.Schema({
    created_date : Date,
    user_id : ObjectId,
    team_name : String,
    athletes : [ObjectId],
    league_id : ObjectId,
    stats : {
        wins : Number,
        losses : Number,
    },
    opponent_history : [{
        opponent_id : ObjectId
    }]
});

teamSchema.statics.getTeams = function(cb, leagueId) {
    this.find({
        league_id: leagueId
    }, function(err, teams) {
        cb(teams);
    });
};

teamSchema.statics.getTeam = function(cb, userId, teamId) {
    this.find({
        user_id : userId,
        _id : teamId
    }, function(err, teams) {
        if(teams && teams.length) {
            var team = teams[0].toObject();
            
            console.log(team);
            cb(team);
        } else {
            cb({});
        }
        
    });
};

teamSchema.statics.updateTeam = function(req, res) {
    var athleteIds = req.param('athlete_id');
    var teamId = req.param('team_id');
    console.log('athleteId'+athleteIds);
    console.log('teamId'+teamId);
    console.log(typeof athleteIds);
//    var athletesIdsArray = _.keys(athleteIds); 
//    console.log('athleteids'+athletesIdsArray);
    this.update({
        _id : teamId
    }, {
        athletes : athleteIds
    }, function(err, affected) {
        console.log(err);
        console.log(affected);
    });
};

teamSchema.statics.createTeam = function(opts) {
    var team = new this({
        created_date : Date.now(),
        user_id : opts.userId,
        team_name : opts.teamName,
        league_id : opts.leagueId
    });
    
    team.save(function(err) {
        if(err) console.log(err);
        else console.log('saved');
    });
};

teamSchema.statics.getAllUserTeams = function(cb, userId) {
    this.find({
        user_id : userId
    }, function(err, teams) {    
        cb(teams);
    });
};

var Team = mongoose.model('Team', teamSchema);

module.exports = Team; 