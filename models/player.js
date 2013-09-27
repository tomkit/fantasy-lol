var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
    created_date : Date,
    username : String,
    email : String,
    country : String
});

playerSchema.statics.getAllPlayers = function(cb) {
    this.find({}, 'username', function(err, players) {
        
//        var playerObjects = players.toObject();
        console.log(players);
        cb(players);
    });
};

playerSchema.statics.createPlayer = function(req, res) {
    console.log('got here');
    var username = req.param('username');
    var email = req.param('email');
    var country = req.param('country');
    
    console.log('username:'+username);
    
    var player = new this({
        username : username,
        email : email,
        country : country
    });
    
    player.save(function(err) {
        if(err) console.log(err);
        else console.log('saved');
        
    });
    
    res.redirect('/main');
};

playerSchema.statics.login = function(req, res) {
    this.find({'username':'sdf'}, function(err, player) {
        res.redirect('/main');
    });
};

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;