let error = require("./message.json");

// getError = function (errorCode) {
//     if (error[errorCode]) {
//         return error[errorCode].message;
//     }
//     else {
//         return errorCode;
//     }

// }
getErrorValue=function(errorCode){
    let errObj= new Error();
    /* If errorCode is empty*/
    if(!errorCode){
        errorCode = "SOME_ERROR_OCCURED";
    }

    errObj.code = errorCode;
    errObj.message = (error[errorCode] && error[errorCode].message) ? error[errorCode].message : '';
    errObj.statusCode = (error[errorCode] && error[errorCode].code) ? error[errorCode].code : 400 ;
    
    
    return errObj;
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
sendError = function(res,errorCode){
    let errObj = getErrorValue(errorCode);
    return res.status(errObj.statusCode).send(errObj);
}
module.exports = {
    sendError
};