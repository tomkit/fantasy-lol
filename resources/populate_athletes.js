var http = require('http');
var mongoose = require('mongoose');
var Athlete = require('../models/athlete.js');

var uristring = process.env.MONGOHQ_URL || 'mongodb://localhost/fantasy-lol';

var theport = process.env.PORT || 9000;

mongoose.connect(uristring, function(err, res) {
    if(err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connecting to: ' + uristring);
        insertToDB();
    }
});

function insertToDB() {
    var i;
    var athlete;
    
    for(i = 0; i < 50; i++) {
        athlete = new Athlete({
            first_name : 'joe'+i,
            last_name : 'smoe'+i,
            nickname : 'joe the smoe'+i,
            country : 'usa'
        });
        
        athlete.save(function(err) {
            if(err) {
                console.log('error saving ' + err);
            } else {
                console.log('saving succeeded.');
            }
        });
    }
    

};