//Test Change

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

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