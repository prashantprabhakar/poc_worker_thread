//@ts-check
'use strict'

const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const emailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: 'itsme.pps.aps@gmail.com',
      pass: 'grabbitfoot'
    }
  }


var transport = nodemailer.createTransport(smtpTransport(emailConfig))

exports.sendMail = (data) => {
  let { sendTo, subject, emailMessage, attachments } = data
  console.log({attachments})
  //console.log('inside send mail', {subject, emailMessage})
  return new Promise((resolve , reject) => {
    var mailOptions = {
      from: emailConfig.auth.user,
      to:   sendTo, // list of receivers
      subject: subject, // Subject line
      text: emailMessage, // plaintext body
      html: emailMessage,// html body
      attachments: attachments,
      // ssl: true
    }

    transport.sendMail(mailOptions, function(error, info) {
      if (!error) {
        console.log('Email sent for', {subject})
        return resolve(true)
      }
      else{
        console.log("unable to send email =>", {error});
        return resolve(false)
      }
    });
  })
}
