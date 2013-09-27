var mongoose = require('mongoose');

var leagueSchema = new mongoose.Schema({
    created_date : Date,
    draft_date : Date,
    max_players : Number,
    current_players : Number,
    country : String,
});

var League = mongoose.model('League', leagueSchema);

module.exports = League;