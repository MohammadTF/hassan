const nodemailer = require('nodemailer');
  const sgMail = require('@sendgrid/mail');

require('dotenv').config();

/**
 * Send email
 * @param {string} subject - What is subject
 * @param {string} text - What is body
 * @param {string} to - To whom we want to send email
 * @param {string} from - Who is sending this email
 */

function sendMail(subject, text, to, from = 'hassanraza6007@gmail.com') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);


  const msg = {
    to, // Change to your recipient
    from, // Change to your verified sender
    subject,
    text,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      // console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
}
function sendMail2(subject, text, to, from) {
  if (process.env.ALLOW_EMAIL !== true) return true;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PWD,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}
module.exports = sendMail;
