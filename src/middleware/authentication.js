"use strict"
const jsonwebtoken=require("jsonwebtoken");
const User = require("../models/user");
const messagejs = require("../message/message.js");
const key = require("./key.json")
let auth = async function(req,res,next){
    try {
        //For checking auth token and authenticating the user, throw Error if not authenticated.
        const token= req.header("Authorization");
        const decoded = jsonwebtoken.verify(token,key["secret"]);
        const user = await User.getActiveUser({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error("USER_NOT_FOUND");
        }
        req.user = user;
        next();    
    } catch (e) {
        // res.status(401).send(messagejs.prepareErrorObject("AUTH_REQUIRED"));
        messagejs.sendError(res, "AUTH_REQUIRED")
    }
    
}
module.exports=auth;