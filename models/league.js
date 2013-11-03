var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var Team = require('./team.js');
var Player = require('./player.js');

var leagueSchema = new mongoose.Schema({
    created_date : Date,
    user_id : ObjectId,
    league_name : String,
    draft_date : Date,
    max_players : Number,
    current_players : Number,
    country : String,
});


leagueSchema.statics.getLeague = function(cb, leagueId) {
    console.log(leagueId);
    this.find({
        _id : leagueId
    }, function(err, leagues) {
        console.log(leagues);
        if(leagues && leagues.length) {
            
            cb(leagues[0]);
        } else {
            cb({});
        }
        
    });
};

leagueSchema.statics.getAllLeagues = function(cb) {
    this.find({}, 'league_name', function(err, leagues) {    
        cb(leagues);
    });
};

leagueSchema.statics.createLeague = function(req, res) {
    console.log('got here');
    var leagueName = req.param('league_name');
    var players = [];
    players.push(req.param('player1_email'));
    players.push(req.param('player2_email'));
    players.push(req.param('player3_email'));
    players.push(req.param('player4_email'));
    players.push(req.param('player5_email'));
    players.push(req.param('player6_email'));
    players.push(req.param('player7_email'));
    players.push(req.param('player8_email'));
    players.push(req.user.email);
    console.log('leagueName:'+leagueName);
    
    var league = new this({
        league_name : leagueName
    });
    
    league.save(function(err) {
        if(err) console.log(err);
        else console.log('saved');        
    });
    
    Player.resolveEmails(function(playerObjs) {
        for(var i = 0; i < players.length; i++) {
            
            if(players[i]) {
                var playerEmail = players[i];
                console.log(playerObjs);
                // Inefficient, but do it for now
                for(var j = 0; j < playerObjs.length; j++) {
                    if(playerObjs[j].email === playerEmail) {
                        Team.createTeam({
                            userId: playerObjs[j].id,
                            teamName: leagueName,
                            leagueId: league.id
                        });
                        break;
                    }
                }
            }
        }
    }, players);
    
    
    
    res.redirect('/main');
};

var League = mongoose.model('League', leagueSchema);

module.exports = League;