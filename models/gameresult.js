var mongoose = require('mongoose');

var gameResultSchema = new mongoose.Schema({
    datetime : Date,
    player_name : String,
    team_name : String,
    opponent_team_name : String,
    game_duration : String,
    win : Boolean,
    spells : [String],
    kills : Number,
    deaths : Number,
    assists : Number,
    cs : Number,
    gold : String,
    items : [String],
    bans : [String],
    opponent_bans : [String]
});

var GameResult = mongoose.model('GameResult', gameResultSchema);

module.exports = GameResult;