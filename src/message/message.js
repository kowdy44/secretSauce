"use strict"
const message = require("./message.json");

// getError = function (errorCode) {
//     if (message[errorCode]) {
//         return message[errorCode].message;
//     }
//     else {
//         return errorCode;
//     }

// }
const getErrorValue=function(errorCode){
    let errObj= new Error();
    /* If errorCode is empty*/
    if(!errorCode){
        errorCode = "SOME_ERROR_OCCURED";
    }

    errObj.code = errorCode;
    errObj.message = (message[errorCode] && message[errorCode].message) ? message[errorCode].message : '';
    errObj.statusCode = (message[errorCode] && message[errorCode].code) ? message[errorCode].code : 400 ;
    
    
    return errObj;
}

const getSuccessValue=function(successCode){
    let successObj={};
    /* Construct sucess message*/
    if(!successCode){
        successCode = "NO_MESSAGE";
    }

    successObj.code = successCode;
    successObj.message = (message[successCode] && message[successCode].message) ? message[successCode].message : '';
    successObj.statusCode = (message[successCode] && message[successCode].code) ? message[successCode].code : 400 ;
    
    
    return successObj;
}

// prepareErrorObject = function (errorCode) {
//     let err = new Error();
    
//     if(errorCode instanceof Error){
//         err.message = errorCode.message
//     }else{
//         err.message = getError(errorCode);
//     }
    
//     return err;
// }
const sendError = function(res,errorCode){
    let errObj = getErrorValue(errorCode);
    return res.status(errObj.statusCode).send(errObj);
}
const sendSuccess = function(res,successCode){
    let successObj = getSuccessValue(successCode);
    return res.status(successObj.statusCode).send(successObj);
}
module.exports = {
    sendError,sendSuccess
};