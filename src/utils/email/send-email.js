"use strict";
const nodemailer = require("nodemailer");

//Configuration for email
const serviceHost = 'smtp.gmail.com';
const servicePort = 465;
const serviceUsername = 'yourtravelbuddy44@gmail.com';
const servicepass = 'eawd dhrj dian jvum';

function sendMailNow(emailContent) {
  return new Promise(function (resolve, reject) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: serviceHost,
      port: servicePort, // true for 465, false for other ports
      auth: {
        user: serviceUsername, 
        pass: servicepass 
      }
    });

    let info = transporter.sendMail(emailContent, function (err, info) {
      if (err) {
        reject(err);
      }
      else {
        resolve(info);
      }
    })
  })
}
module.exports = {
  sendMailNow
}