const express= require("express");

const User = require('../models/user')
const router = new express.Router()
const error = require("../Error/error")
const userUtil = require("../utils/user-utils");
const jsonwebtoken = require("jsonwebtoken");
const auth = require("../middleware/authentication");

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        res.status(201).send(userUtil.prepareUserRes(user))
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // const token = jsonwebtoken.sign({_id:user._id},"ThisisSecret");
        let token = await user.generateAuthToken();
        res.status(200).send({_id:token});
    } catch (e) {
        res.status(422).send(error.prepareErrorObject(e))
    }
})

router.patch('/users/changepassword', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.oldPassword);
        user.password=req.body.newPassword
        await user.save()

        res.status(201).send(userUtil.prepareUserRes(user))
    } catch (e) {
        // e.message=error.getError("UNABLE_TO_CHANGE_PASSWORD");
        res.status(422).send(error.prepareErrorObject("UNABLE_TO_CHANGE_PASSWORD"));
    }
})

router.get('/users/me', auth ,async (req, res) => {
    return res.status(200).send(req.user);
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

router.patch('/users/updateUser/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        
        res.send(userUtil.prepareUserRes(user))
    } catch (e) {
        res.status(400).send(e)
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
