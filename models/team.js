var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    created_date : Date,
    user_id : ObjectId,
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

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;