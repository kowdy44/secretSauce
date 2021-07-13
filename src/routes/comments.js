"use strict"
const express= require("express");
const router = new express.Router();

const CommentsSection =  require("../models/commentsSection");
const auth = require("../middleware/authentication");
const messagejs = require("../message/message.js");
const Paragraph = require("../models/paragraph");
const email = require("../utils/email/comment-email");

router.post('/comments/:paraId',auth,async (req, res) => {

    try {
        //To find if paragraph is present
        let paragraphPresent= await Paragraph.paragraphPresent(req.params.paraId)
        if(paragraphPresent){
            await CommentsSection.createAComment(req.body,req.params.paraId,req.user);
            email.sendEmailCommentAdded(paragraphPresent.userEmail);
            messagejs.sendSuccess(res, "NEW_COMMENT_CREATED")
        }else{
            messagejs.sendError(res, "ERROR_OCCURED_IN_COMMENT_CREATION_PARAGRAPH_NOT_PRESENT")
        }
        
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

module.exports = router;