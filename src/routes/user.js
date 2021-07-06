"use strict"
const express= require("express");

const User = require('../models/user')
const router = new express.Router()
const messagejs = require("../message/message.js")
const userUtil = require("../utils/user-utils");
const jsonwebtoken = require("jsonwebtoken");
const auth = require("../middleware/authentication");
const userEmail =require("../utils/email/user-email");

router.post('/users/signup', async (req, res) => {
    req
    const user = new User(req.body)

    try {
        await user.save();
        //it generates token and saves the token to user model
        let token = await user.generateAuthToken();
        let userRes={
            userDetail:userUtil.prepareUserRes(user),
            _id:token,
            message:"Signup successful!"
        }
        res.status(201).send(userRes);
        userEmail.sendEmailSignUp(user.email);
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // const token = jsonwebtoken.sign({_id:user._id},"ThisisSecret");
        let token = await user.generateAuthToken();
        res.status(200).send({_id:token});
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.patch('/users/forgotpassword', async (req, res) => {
    try {
        
        //Email is required to generate passcode.
        if(!req.body.email){
            throw new Error("EMAIL_IS_REQUIRED")
        }

        //genarate a random number 
        let randomKey= userUtil.genRandomNum();
        
        //get user data by email
        let user = await User.getActiveUser({ email: req.body.email });
        
        //Save passcode in DB
        user.passcode = randomKey;
        await user.save();
        
        //send email with passcode and create API changePaswdNow to actually change passwrd
        userEmail.sendEmailPasscode(user.email,user.passcode);
        
        // res.status(201).send("PASSCODE_EMAIL_INITIATED");
        messagejs.sendSuccess(res, "PASSCODE_EMAIL_INITIATED")
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.patch('/users/changeforgottenpassword', async (req, res) => {
    try {
        if(!req.body.email){
            throw new Error("EMAIL_IS_REQUIRED")
        }

        //get user data by email
        let user = await User.getActiveUser({ email: req.body.email });
        
        //Recieve new password, confirm password and passcode
        let newpassword = req.body.newpassword;
        let confirmpassword = req.body.confirmpassword;

        //Recieve new password, confirm password and passcode
        //Compare new and confirm passwords
        if(!newpassword || !confirmpassword || newpassword!==confirmpassword)
        {
            throw new Error("PASSWORD_MISMATCH_WITH_CONFIRM_PASSWORD")
        }
        if(!req.body.passcode || !user.passcode || req.body.passcode!==user.passcode ){
            throw new Error("PASSCODE_MISMATCH")
        }
        
        //bit hash the new password and save in DB
        user.passcode=0;
        user.password=newpassword;
        await user.save();
        // res.status(201).send("PASSWORD_CHANGED_SUCCESSFULLY");
        messagejs.sendError(res,"PASSWORD_CHANGED_SUCCESSFULLY")
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.patch('/users/logoutAll', auth ,async (req, res) => {
    try {
        //Need to write logic here
        req.user.tokens=[];
        req.user.save();
        // res.status(201).send("LOGGED_OUT_SUCCESSFULLY");
        messagejs.sendError(res,"LOGGED_OUT_SUCCESSFULLY")
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.patch('/users/changepassword', auth, async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.oldPassword);
        user.password=req.body.newPassword
        await user.save()
        // res.status(201).send(userUtil.prepareUserRes(user))
        messagejs.sendError(res,"PASSWORD_CHANGED");
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send(userUtil.userResp(req.user,["email","name","age"]));
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
    
})

router.get('/users/testing', async (req, res) => {
    try {
    console.log("API,'/users/testing' called");
    return res.status(200).send("Hi,This is just a message. Auth disabled here :)");
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
    
})

router.patch('/users/updateUser/:email', auth ,async (req, res) => {

    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'age']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            throw new Error("NOT_ABLE_TO_UPDATE_USER");
        }


        let user = await User.getActiveUser({ email: req.params.email });
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(userUtil.prepareUserRes(user))
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router
