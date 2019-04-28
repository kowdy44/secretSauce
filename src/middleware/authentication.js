const jsonwebtoken=require("jsonwebtoken");
const User = require("../models/user");
const errorjs = require("../Error/error");
const key = require("./key.json")
let auth = async function(req,res,next){
    try {
        const token= req.header("Authorization");
        const decoded = jsonwebtoken.verify(token,key["secret"]);
        const user = await User.getActiveUser({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.user = user;
        next();    
    } catch (error) {
        res.status(401).send(errorjs.prepareErrorObject("AUTH_REQUIRED"));
    }
    
}
module.exports=auth;