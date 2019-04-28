let error = require("./error-message.json");

getError = function (errorCode) {
    if (error[errorCode]) {
        return error[errorCode].message;
    }
    else {
        return errorCode;
    }

}

prepareErrorObject = function (errorCode) {
    let err = new Error();
    
    if(errorCode instanceof Error){
        err.message = errorCode.message
    }else{
        err.message = getError(errorCode);
    }
    
    return err;
}
module.exports = {
    getError,
    prepareErrorObject
};