const express= require("express");

const User = require('../models/user')
const router = new express.Router()
const error = require("../Error/error")
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
        error.sendError(res, e.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // const token = jsonwebtoken.sign({_id:user._id},"ThisisSecret");
        let token = await user.generateAuthToken();
        res.status(200).send({_id:token});
    } catch (e) {
        error.sendError(res, e.message)
    }
})

router.patch('/users/changepassword', auth , async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.oldPassword);
        user.password=req.body.newPassword
        await user.save()

        res.status(201).send(userUtil.prepareUserRes(user))
    } catch (e) {
        // e.message=error.getError("UNABLE_TO_CHANGE_PASSWORD");
        // res.status(422).send(error.prepareErrorObject("UNABLE_TO_CHANGE_PASSWORD"));
        error.sendError(res, e.message)
    }
})

router.get('/users/me', auth ,async (req, res) => {
    console.log("Hi")
    return res.status(200).send(userUtil.userResp(req.user,["email","name","age"]));
})
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/updateUser/:email', async (req, res) => {

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
        error.sendError(res, e.message)
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
