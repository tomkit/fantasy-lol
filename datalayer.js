var http = require('http');
var mongoose = require('mongoose');

var uristring = process.env.MONGOHQ_URL || 'mongodb://localhost/fantasy-lol';

var theport = process.env.PORT || 9000;

mongoose.connect(uristring, function(err, res) {
    if(err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connecting to: ' + uristring);        
    }
});