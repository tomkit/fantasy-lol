var mongoose = require('mongoose');

var athleteSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    nickname : String,
    country : String,
});

athleteSchema.statics.createAthlete = function(req, res) {
    var firstName = req.param('first_name');
    var lastName = req.param('last_name');
    var nickname = req.param('nickname');
    var country = req.param('country');
    
    
    var athlete = new this({
        first_name : firstName,
        last_name : lastName,
        nickname : nickname,
        country : country
    });
    
    athlete.save(function(err) {
        if(err) console.log(err);
        else console.log('saved');
    });
    
    res.redirect('/athletes');
};

athleteSchema.statics.getAthlete = function(cb, userId, resourceId) {
    this.find({
        _id : resourceId
    }, function(err, athletes) {
        cb(athletes[0]);
    });
};

athleteSchema.statics.getAllAthletes = function(cb) {
    this.find({}, function(err, athletes) {
//        console.log('athletes');
//        console.log(athletes);
        cb(athletes);
    });
};

var Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;