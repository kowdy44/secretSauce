"use strict"
const random = require('random');
const prepareUserRes = function (user) {
    let obj = {};
    allowedFields = ["email", "name"]
    allowedFields.forEach(element => {
        obj[element] = user[element];
    });
    return obj;
}
const userResp = function (user, allowedFields) {
    let obj = {};
    if (!allowedFields) {
        allowedFields = ["email", "name", "age"];
    }
    allowedFields.forEach(ele => {
        obj[ele] = user[ele];
    });
    return obj;
}
const genRandomNum = function(){
    //genarate a random number 
    let randomKey = random.int(100000, 999999);
    return randomKey;
}
 
module.exports = {
    prepareUserRes,
    userResp,
    genRandomNum
}