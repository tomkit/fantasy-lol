var http = require('http');
var mongoose = require('mongoose');
var GameResult = require('../models/gameresult.js');

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
    var fs = require('fs');
    var csvString = fs.readFileSync(__dirname + '/out.csv', {encoding:'utf8'});    
    var csvArray = csvString.split('\n');

    var i;
    var gameResult;
    var entry;
    for(i = 1; i < csvArray.length; i++) {        
        entry = csvArray[i].split(',');
        
//        console.log(csvArray[i]);
        
        gameResult = new GameResult({
            datetime : new Date(entry[0] + ' ' + entry[1]),
            player_name : entry[2],
            team_name : entry[3],
            opponent_team_name : entry[4],
            game_duration : entry[5],
            win : !!entry[6],
            spells : entry.slice(7, 8),
            kills : entry[9],
            deaths : entry[10],
            assists : entry[11],
            cs : entry[12],
            gold : entry[13],
            items : entry.slice(14, 19),
            bans : entry.slice(20, 22),
            opponent_bans : entry.slice(23, 25)
        });
        
        gameResult.save(function(err) {
            if(err) {
                console.log('error saving ' + err);
            } else {
                console.log('saving succeeded.');
            }
        });
    }

};