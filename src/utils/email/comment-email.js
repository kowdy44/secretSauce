"use strict";
const sendEmail = require('./send-email');
const logging =require('../../log/logging')('comment-email.log');

const sendEmailCommentAdded=function(emailId,titleParagraph){
    let email=  {
          from: '"Team TravelBuddy 👻" <Supporttravelbuddy@gmail.com>', // sender address
          to: emailId, // list of receivers seperated by coma
          subject: "A Comment has been added to your paragraph!", // Subject line
          text: "A Comment has been added to paragraph titled '"+ titleParagraph+"'. Login to see more details"
        }
        sendEmail.sendMailNow(email).then((info)=>{
          logging.info(`Email sent: ${emailId}, messageId:${info.messageId}, info.response:${info.response} `);
        }).catch((err)=>{
          logging.info('Error: ' + err.message + ' : Email sending failed to '+emailId);
        });
    }

module.exports={ sendEmailCommentAdded }