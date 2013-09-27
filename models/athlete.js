var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    nickname : String,
    country : String,
});

var Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;