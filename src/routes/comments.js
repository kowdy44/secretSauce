"use strict"
const express= require("express");
const router = new express.Router();

const CommentsSection =  require("../models/commentsSection");
const auth = require("../middleware/authentication");
const messagejs = require("../message/message.js")

router.post('/comments/:paraId',auth,async (req, res) => {

    try {
        //To find if paragraph is present
        await CommentsSection.createAComment(req.body,req.params.paraId,req.user);
        messagejs.sendSuccess(res, "NEW_COMMENT_CREATED")
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

module.exports = router;