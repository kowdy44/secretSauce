let error=require("./error-message.json");
getError=function(errorCode){
    return error[errorCode];
}

module.exports = {
    getError:getError
};