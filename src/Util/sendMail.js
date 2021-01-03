const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Send email
 * @param {string} subject - What is subject
 * @param {string} text - What is body
 * @param {string} to - To whom we want to send email
 * @param {string} from - Who is sending this email
 */
function sendMail(subject, text, to, from) {
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
