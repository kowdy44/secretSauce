"use strict"
const random = require('random');

const objectFormat =  function(object,allowedFieldsArray){
    let obj = {};

    allowedFieldsArray.forEach(ele => {
        obj[ele] = object[ele];
    });
    return obj;
}
const genRandomNum = function(){
    //genarate a random number 
    let randomKey = random.int(100000, 999999);
    return randomKey;
}
 
module.exports = {
    genRandomNum,
    objectFormat
}