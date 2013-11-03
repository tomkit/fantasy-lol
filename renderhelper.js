function RenderHelper() {
    
}

RenderHelper.prototype.flattenObjectIdArray = function(objectIdArray) {
    var objectIdObject = {};

    console.log(objectIdArray);
    for(var i = 0; objectIdArray && i < objectIdArray.length; i++) {
        console.log('flat');
        console.log(objectIdArray[i]);
        objectIdObject[objectIdArray[i].toHexString()] = true;
    }
    
    return objectIdObject;
};

module.exports = RenderHelper;