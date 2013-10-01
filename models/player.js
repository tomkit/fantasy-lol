var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
    created_date : Date,
    username : String,
    email : String,
    country : String
});

playerSchema.statics.getAllPlayers = function(cb) {
    this.find({}, 'username', function(err, players) {
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

playerSchema.statics.localLogin = function(cb, username) {
    this.find({
        'username' : username
    }, function(err, player) {
        
        if(player && player.length) {
            cb(null, username);
        } else {
            cb(new Error("Couldn't log in."));
        }
    });
};

playerSchema.statics.login = function(req, res) {
    var username = req.param('username');
    
    this.find({
        'username' : username
    }, function(err, player) {
        
        if(player && player.length) {
            console.log(player[0]);
            console.log(player[0].id);
            console.log(req.session);
            
            req.session.user = {
                id : player[0].id
            };
            
            console.log('logged in:');
            console.log(req.session.user);
            
            res.redirect('/main');
        } else {
            res.redirect('/fail_login');
        }
        
    });
};

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;