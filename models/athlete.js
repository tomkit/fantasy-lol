var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    nickname : String,
    country : String,
});

athleteSchema.statics.getAthlete = function(cb, userId, resourceId) {
    this.find({
        _id : resourceId
    }, function(err, athletes) {
        cb(athletes[0]);
    });
};

athleteSchema.statics.getAllAthletes = function(cb) {
    this.find({}, function(err, athletes) {
        console.log('athletes');
        console.log(athletes);
        cb(athletes);
    });
};

var Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;