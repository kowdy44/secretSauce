let error=require("./error-message.json");

getError=function(errorCode){
    return error[errorCode].message;
}

prepareErrorObject= function(e){
    let err= new Error();
    err.message=e.message;
    return err;
}
module.exports = {
    getError,
    prepareErrorObject
};