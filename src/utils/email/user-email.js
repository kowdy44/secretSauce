"use strict";
const sendEmail = require('./send-email');
const logging =require('../../log/logging')('user-email.log');

const sendEmailSignUp=function(emailId){
let email=  {
      from: '"Support Team 👻" <Supporttravelbuddy@gmail.com>', // sender address
      to: emailId, // list of receivers seperated by coma
      subject: "Thank you signing up!", // Subject line
      text: "Thank you! for signing up for App :)"
    }
    sendEmail.sendMailNow(email).then((info)=>{
      logging.info(`Email sent: ${emailId}, messageId:${info.messageId}, info.response:${info.response} `);
    }).catch((err)=>{
      logging.info('Error: ' + err.message + ' : Email sending failed to '+emailId);
    });
}
module.exports={ sendEmailSignUp }