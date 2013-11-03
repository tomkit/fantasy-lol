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

gameResultSchema.statics.createGameResult = function(req, res) {
    var playerName = req.param('player_name');
    var teamName = req.param('team_name');
    var opponentTeamName = req.param('opponent_team_name');
    var gameDuration = req.param('game_duration');
    var win = req.param('win');
    var spells = req.param('spells');
    var kills = req.param('kills');
    var deaths = req.param('deaths');
    var assists = req.param('assists');
    var cs = req.param('cs');
    var gold = req.param('gold');
    var items = req.param('items');
    var bans = req.param('bans');
    
    var gameResult = new this({
        datetime : new Date(),
        player_name : playerName,
        team_name : teamName,
        opponent_team_name : opponentTeamName,
        game_duration : gameDuration,
        win : win,
        spells : spells,
        kills : kills,
        deaths : deaths,
        assists : assists,
        cs : cs,
        gold : gold,
        items : items,
        bans : bans,
        opponent_bans : bans // Inverse
    });
    
    gameResult.save(function(err) {
        if(err) console.log(err);
        else console.log('saved');
    });
    
    res.send(true);
};

var GameResult = mongoose.model('GameResult', gameResultSchema);

module.exports = GameResult;