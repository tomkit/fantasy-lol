var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var leagueSchema = new mongoose.Schema({
    created_date : Date,
    user_id : ObjectId,
    league_name : String,
    draft_date : Date,
    max_players : Number,
    current_players : Number,
    country : String,
});

leagueSchema.statics.getAllLeagues = function(cb) {
    this.find({}, 'league_name', function(err, leagues) {    
        cb(leagues);
    });
};

leagueSchema.statics.createLeague = function(req, res) {
    console.log('got here');
    var leagueName = req.param('league_name');
    
    console.log('leagueName:'+leagueName);
    
    var league = new this({
        league_name : leagueName
    });
    
    league.save(function(err) {
        if(err) console.log(err);
        else console.log('saved');
        
    });
    
    res.redirect('/main');
};

var League = mongoose.model('League', leagueSchema);

module.exports = League;