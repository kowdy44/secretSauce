prepareUserRes = function (user) {
    let obj = {};
    allowedFields = ["email", "name"]
    allowedFields.forEach(element => {
        obj[element] = user[element];
    });
    return obj;
}
userResp = function (user, allowedFields) {
    let obj = {};
    if (!allowedFields) {
        allowedFields = ["email", "name", "age"];
    }
    allowedFields.forEach(ele => {
        obj[ele] = user[ele];
    });
    return obj;
}
module.exports = {
    prepareUserRes,
    userResp
}