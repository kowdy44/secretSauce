"use strict"
const express= require("express");
const router = new express.Router();

const Paragraph = require('../models/paragraph')
const auth = require("../middleware/authentication");
const messagejs = require("../message/message.js");
const utiljs = require("../utils/utils");

router.post('/paragraphs/addNew',auth,async (req, res) => {

    try {
        await Paragraph.createAParagraph(req.body,req.user);
        messagejs.sendSuccess(res, "NEW_PARAGRAPH_CREATED")
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.get('/paragraphs/getOne/:id',auth,async (req, res) => {

    try {
        let paragraph = await Paragraph.getAParagraph(req.params.id);
        paragraph = utiljs.objectFormat(paragraph,["title","content","comments","userEmail"]);
        let arr=[];
        paragraph.comments.forEach(element => {
            let obj = utiljs.objectFormat(element,["userEmail","comment","paragraphId"]);
            arr.push(obj);
        });
        paragraph.comments = arr;
        res.status(200).send(paragraph);
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

router.get('/paragraphs/getAll',auth,async (req, res) => {

    try {
        let paragraphs = await Paragraph.getAllParagraph(req.user.email);
        
        let arr=[];
        paragraphs.forEach(element => {
            let obj = utiljs.objectFormat(element,["title","content","userEmail"]);
            arr.push(obj);
        });
        
        res.status(200).send(arr);
    } catch (e) {
        messagejs.sendError(res, e.message)
    }
})

module.exports = router