"use strict";
const sendEmail = require('./send-email');
const logging =require('../../log/logging')('user-email.log');
const EmailModel = require("../../models/email");
// var emailobj = new EmailModel();

const sendEmailSignUp=function(emailId){
let email=  {
      from: '"Team TravelBuddy 👻" <Supporttravelbuddy@gmail.com>', // sender address
      to: emailId, // list of receivers seperated by coma
      subject: "Thank you signing up!", // Subject line
      text: "Thank you! for signing up for App :)"
    }
    sendEmail.sendMailNow(email).then((info)=>{
      EmailModel.emailStatusUpdate(emailId,true);
      logging.info(`Email sent: ${emailId}, messageId:${info.messageId}, info.response:${info.response} `);
    }).catch((err)=>{
      EmailModel.emailStatusUpdate(emailId,false);
      logging.info('Error: ' + err.message + ' : Email sending failed to '+emailId);
    });
}
const sendEmailPasscode=function(emailId,passcode){
  let email=  {
        from: '"Team TravelBuddy 👻" <Supporttravelbuddy@gmail.com>', // sender address
        to: emailId, // list of receivers seperated by coma
        subject: "Password change requested!", // Subject line
        text: "Passcode to change password : "+passcode
      }
      sendEmail.sendMailNow(email).then((info)=>{
        EmailModel.emailStatusUpdate(emailId,true);
        logging.info(`Email sent(passcode): ${emailId}, messageId:${info.messageId}, info.response:${info.response} `);
      }).catch((err)=>{
        EmailModel.emailStatusUpdate(emailId,false);
        logging.info('Error: ' + err.message + ' : Email sending(passcode) failed to '+emailId);
      });
  }
module.exports={ sendEmailSignUp,sendEmailPasscode }