"use strict"
const jsonwebtoken = require("jsonwebtoken");
const Cryptr = require("cryptr");
const User = require("../models/user");
const APILogs = require("../models/APILogs");
const EncryptionKey = require("../models/encryptionKey");
const messagejs = require("../message/message.js");
const key = require("./key.json")
let auth = async function(req,res,next){
    try {
        //For checking auth token and authenticating the user, throw Error if not authenticated.
        const token = req.header("Authorization");
        const decoded = jsonwebtoken.verify(token,key["secret"]);
        const user = await User.getActiveUser({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error("USER_NOT_FOUND");
        }
        req.token = token;
        req.user = user;

        //-----------For logging Requests that reached system------------------
        
        const { rawHeaders, httpVersion, method, socket, url } = req;
        const { remoteAddress, remoteFamily } = socket;
        var stringdata=JSON.stringify({
            timestamp: Date.now(),
            rawHeaders,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url
        })

        //----------POC on encryption and decryption------------------
        try {
            console.log(stringdata);
            console.log("--------------------------------------------")
            let encryptionKeyObj = await EncryptionKey.findOne({ useremail: user.email });
            let encryptKey = encryptionKeyObj.keys[encryptionKeyObj.keys.length-1];
            let crypt=new Cryptr(encryptKey.key);
            let encryptedString = crypt.encrypt(stringdata);
            console.log(encryptedString);
            console.log("----------------------------------------------");
            let decryptedString = crypt.decrypt(encryptedString);
            console.log(decryptedString);

            const apilogs = APILogs({ userId:user.name,data: encryptedString });
            await apilogs.save();
            
        } catch (error) {
            console.log("Caught Error : " + error);
        }
        //--------------------------------------------------------------
        //----------------------------------------------------------------------

        next();    
    } catch (e) {
        // res.status(401).send(messagejs.prepareErrorObject("AUTH_REQUIRED"));
        messagejs.sendError(res, "AUTH_REQUIRED")
    }
    
}
module.exports=auth;