let error=require("./error-message.json");

getError=function(errorCode){
    if(error[errorCode]){
        return error[errorCode].message;
    }
    else{
        return errorCode;
    }
    
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