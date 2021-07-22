"use strict"
const mongoose = require('mongoose');
const validator = require('validator');
const CommentsSection = require("./commentsSection");

/*Defining paragraph json object */
const paragraphSchemaObject = {
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String
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
const paragraphSchema = new mongoose.Schema(paragraphSchemaObject);

paragraphSchema.statics.createAParagraph = async (paragraph, user) => {
    
    let obj = {};
    let fields = ["title", "content"];

    if (!user) {
        // throw new Error user not found
        throw new Error('USER_NOT_FOUND');
    }else{
        obj["userEmail"]=user.email;
    }
    fields.forEach(ele => {
        obj[ele] = paragraph[ele];
    });
    const paragraphObj = new Paragraph(obj);
    await paragraphObj.save();
    return paragraphObj;
}
paragraphSchema.statics.paragraphPresent = async (paragraphId) => {
    
    let paragraph  = await Paragraph.findOne({title:paragraphId});
    if(!paragraph){
        return false;
    }else{
        return paragraph;
    }
}

/* Get a paragraph with comments appended on them */
paragraphSchema.statics.getAParagraph = async (paragraphId) => {
    
    let paragraph = await Paragraph.findOne({title:paragraphId});
    if(!paragraph){
        throw new Error("ERROR_PARAGRAPH_NOT_PRESENT")
    }
    let comments  = await CommentsSection.getComments(paragraphId);
    
    paragraph.comments = comments;
    return paragraph;
}

paragraphSchema.statics.getAllParagraph = async (email) => {
    
    let paragraphs = await Paragraph.find({userEmail:email});
    
    return paragraphs;
}

//exporting the model
const Paragraph = mongoose.model('Paragraph', paragraphSchema);
module.exports = Paragraph;