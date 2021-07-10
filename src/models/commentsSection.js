"use strict"
const mongoose = require('mongoose');
const validator = require('validator');
const Paragraph = require('./paragraph');

/*Defining paragraph json object */
const commentsSectionSchemaObject = {
    comment: {
        type: String
    },
    paragraphId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    isdeleted: {
        type: Boolean,
        default: false
    }
};

//Creatting user schema with defined fields in paragraphSchemaObject.
const commentsSchema = new mongoose.Schema(commentsSectionSchemaObject);

commentsSchema.statics.getComments = async (paragraphId) => {
    
    
    let comments  = await CommentsSection.find({paragraphId:paragraphId});
    
    return comments;
}
commentsSchema.statics.createAComment = async (body,paragraphId,user) => {
    let obj = {};
    let fields = ["comment"];

    if (!user) {
        // throw new Error user not found
        throw new Error('USER_NOT_FOUND');
    }else{
        obj["userEmail"]=user.email;
    }
    fields.forEach(ele => {
        obj[ele] = body[ele];
    });
    //if ParagraphId present
    // if(await Paragraph.paragraphPresent(paragraphId)){
        obj["paragraphId"]=paragraphId;
    // }
    const commentsObj = new CommentsSection(obj);
    await commentsObj.save();
    return commentsObj;
    
}
//exporting the model
const CommentsSection = mongoose.model('CommentsSection', commentsSchema);
module.exports = CommentsSection;