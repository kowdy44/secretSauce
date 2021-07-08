"use strict"
const mongoose = require('mongoose')
const validator = require('validator')
const emailSchemaObject = {
    email: {
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
    status: {
        type: Boolean,
        default: false
    }
};
//Creatting Email schema with defined fields in emailSchemaObject.
const emailSchema = new mongoose.Schema(emailSchemaObject);

//Methods on Email model
emailSchema.statics.emailStatusUpdate = async function (emailID,status){
    try {
        
    var email=new Email();
    email.email=emailID;
    email.status=status
    await email.save();
    return email.email;    
    } catch (error) {
      console.log(error);  
    }
    
}

//Exporting the mongoose model of Email created from emailSchema.
const Email = mongoose.model('Email', emailSchema);
module.exports = Email