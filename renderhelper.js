function RenderHelper() {
    
}

RenderHelper.prototype.flattenObjectIdArray = function(objectIdArray) {
    var objectIdObject = {};

    console.log(objectIdArray);
    for(var i = 0; objectIdArray && i < objectIdArray.length; i++) {
        console.log('flat');
        console.log(objectIdArray[i]);
        objectIdObject[objectIdArray[i].toHexString()] = objectIdArray[i];
    }
    
    return objectIdObject;
};

RenderHelper.prototype.randomLeagueImage = function() {
    var leagueImages = ['http://images1.wikia.nocookie.net/__cb20121218023622/leagueoflegends/images/b/bc/ProfileIcon40.jpg',
                        'http://images4.wikia.nocookie.net/__cb20121218023622/leagueoflegends/images/thumb/1/17/ProfileIcon39.jpg/100px-ProfileIcon39.jpg',
                        'http://images3.wikia.nocookie.net/__cb20121218023622/leagueoflegends/images/thumb/b/b8/ProfileIcon38.jpg/100px-ProfileIcon38.jpg',
                        'http://images1.wikia.nocookie.net/__cb20121218023622/leagueoflegends/images/thumb/8/8b/ProfileIcon37.jpg/100px-ProfileIcon37.jpg',
                        
                        ];
    
    return leagueImages[Math.floor((Math.random()*(leagueImages.length-1)))];
};

RenderHelper.prototype.randomPlayerImage = function() {
    var playerImages = ['http://images2.wikia.nocookie.net/__cb20110527180303/leagueoflegends/images/c/c4/ProfileIcon29.jpg',
                        'http://images1.wikia.nocookie.net/__cb20110527180302/leagueoflegends/images/b/bd/ProfileIcon28.jpg',
                        'http://images4.wikia.nocookie.net/__cb20110527180261/leagueoflegends/images/2/2c/ProfileIcon27.jpg',
                        'http://images2.wikia.nocookie.net/__cb20110527180260/leagueoflegends/images/8/88/ProfileIcon26.jpg'];
    
    return playerImages[Math.floor((Math.random()*(playerImages.length-1)))];
};

RenderHelper.prototype.randomAthleteImage = function() {
    var athleteImages = [
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/5/5a/S3_tsmtheoddone_2.jpg/220px-S3_tsmtheoddone_2.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/9/9c/NiP_Bjergsen.jpg/220px-NiP_Bjergsen.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/f/f7/S3_tsmwildturtle_2.jpg/220px-S3_tsmwildturtle_2.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/a/ab/S3_tsmxpecial_2.jpg/220px-S3_tsmxpecial_2.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/3/3a/Crsacad_altec.JPG/220px-Crsacad_altec.JPG',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/1/1a/S3_tsmdyrus_2.jpg/220px-S3_tsmdyrus_2.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/4/4f/S3_tsmreginald_2.jpg/220px-S3_tsmreginald_2.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/6/66/Wingsofdeathxxx.jpeg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/d/d7/DanDinh3.jpg/220px-DanDinh3.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/b/b3/Chaox_07126_screen.jpg/220px-Chaox_07126_screen.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/b/b6/Trmlol.jpg/220px-Trmlol.jpg',
                         'http://hydra-media.cursecdn.com/lol.gamepedia.com/thumb/d/db/Shield_locodoco.jpg/220px-Shield_locodoco.jpg',
                         
                         ];
    return athleteImages[Math.floor((Math.random()*(athleteImages.length-1)))];
};

module.exports = RenderHelper;