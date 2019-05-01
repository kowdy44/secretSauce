prepareUserRes=function(user){
let obj={};
allowedFields=["email","name"]
allowedFields.forEach(element => {
    obj[element]=user[element];
});
return obj;
}
module.exports={
    prepareUserRes
}