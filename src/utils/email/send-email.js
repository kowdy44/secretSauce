"use strict";
const nodemailer = require("nodemailer");

//Configuration for email
const serviceHost = process.env.EMAIL_SERVICE_HOST;
const servicePort = process.env.EMAIL_SERVICE_PORT;
const serviceUsername = process.env.EMAIL_SERVICE_USERNAME;
const servicepass = process.env.EMAIL_SERVICE_PASS;

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