"use strict"
const random = require('random');

const objectFormat =  function(object,allowedFieldsArray){
    let obj = {};

    allowedFieldsArray.forEach(ele => {
        obj[ele] = object[ele];
    });
    return obj;
}
const getDateTime = function () { 
    var currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getDate() + "/" + currentdate.getMonth()+1
        + "/" + currentdate.getFullYear() + " @ " 
        +  currentdate.getHours() + ":" 
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}
const genRandomNum = function(){
    //genarate a random number 
    let minNumber = process.env.RANDOMNUM_MIN
    let maxNumber = process.env.RANDOMNUM_MAX
    let randomKey = random.int(minNumber, maxNumber);
    return randomKey;
}

const getClientDetails = function (req) { 
    //-----------For logging Requests that reached system------------------
        
    const { rawHeaders, httpVersion, method, socket, url } = req;
    const { remoteAddress, remoteFamily } = socket;
    var stringdata = JSON.stringify({
        timestamp: getDateTime(),
        rawHeaders,
        httpVersion,
        method,
        remoteAddress,
        remoteFamily,
        url
    });

    return stringdata;
}
 
module.exports = {
    genRandomNum,
    objectFormat,
    getClientDetails
}