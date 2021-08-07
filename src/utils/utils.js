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
    let minNumber = process.env.RANDOMNUM_MIN
    let maxNumber = process.env.RANDOMNUM_MAX
    let randomKey = random.int(minNumber, maxNumber);
    return randomKey;
}
 
module.exports = {
    genRandomNum,
    objectFormat
}