/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { STUDENT_REGISTERED } = require('../../../config/constants');
const { Student } = require('../model');
const parseEmail = require('../../../Util/parseEmail');
const push = require('../../../Util/push');
const randomString = require('../../../Util/randomString');
const sendMail = require('../../../Util/sendMail');
require('dotenv').config();

async function register(req, res) {
  try {
    console.log('calling student register');
    /**
     * @type {Student}
     */
    const student = req.body;
    console.log({ student: req.body });
    // check if request has email
    if (_.isUndefined(student.email)) return res.json({ status: false, data: [], message: 'Email is required.' });
    // run email parser on input email
    const parsedEmail = parseEmail(student.email);
    // check if email successfully parsed
    if (!parsedEmail) return res.json({ status: false, data: [], message: 'Invalid email provided.' });
    // check if email is exists
    const isExists = await Student.findOne({ email: student.email });
    if (isExists) return res.json({ status: false, data: [], message: 'Email already exists.' });

    const pwd = randomString.random;
    /**
     * @type {Student}
     */
    const objStudent = new Student(); // create a new instance of the student model
    objStudent.email = student.email;
    objStudent.encryptedPassword = bcrypt.hashSync(pwd, 10);
    objStudent.roll = parsedEmail.roll;
    objStudent.year = parsedEmail.year;
    objStudent.department = parsedEmail.department;
    //   save the student and check for errors
    const isSaved = await objStudent.save();
    console.log('Data saved');
    console.log(isSaved);
    if (isSaved) {
      // sending email to student
      // student.email
      console.log({ pwd });
      sendMail('Registration successful.', `You have successfully registered. Your password is :${pwd}`, 'faizyabm@gmail.com', 'admin@quest.edu.pk');
      // sending email to admin
      sendMail('New student is registered',
        `
      Email: ${objStudent.email}
      Roll Number: ${objStudent.roll}
      Year: ${objStudent.year}
      Department: ${objStudent.department}
      
      `,
        process.env.ADMIN_EMAIL, 'admin@quest.edu.pk');

      push(STUDENT_REGISTERED, 'New student registered');

      return res.json({ status: true, data: isSaved, message: 'Student registered.' });
    }
    return res.json({ status: false, data: [], message: 'Server error.' });
  } catch (e) {
    console.error('error calling student register');
    console.error(e);
    console.error('----------');
    return res.json({ status: false, data: [], message: 'Server error.' });
  }
}

async function login(req, res) {
  // 11it24@quest.edu.pk
  // uvbf84i4
  //
  // login code
  try {
    console.log('calling login function');
    const { body } = req;
    if (_.isUndefined(body.email)) {
      return res.json({ status: false, data: [], message: 'email is required.' });
    }
    if (_.isUndefined(body.password)) {
      return res.json({ status: false, data: [], message: 'password is required.' });
    }
    if (_.isUndefined(body.deviceId)) {
      return res.json({ status: false, data: [], message: 'deviceId is required.' });
    }
    Student.findOne({ email: body.email })
      .then((student) => {
        if (!student) {
          return res.json({ status: false, data: [], message: 'that email is not registered' });
        }
        // match pass
        bcrypt.compare(body.password, student.encryptedPassword, (err, isMatch) => {
          if (err) {
            console.error('error login');
            console.error(err);
            return res.json({ status: false, data: [], message: 'server error' });
          }

          if (isMatch) {
            const payload = {
              userId: student.id,
              email: student.email,
            };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
            // Student.update();
            return res.json({ status: true, data: { ...student._doc, accessToken, refreshToken }, message: 'Login success.' });
          }
          return res.json({ status: false, data: [], message: 'pass incorrect' });
        });
      })
      .catch((err) => {
        console.error(err);
        return res.json({ status: false, data: [], message: 'server error' });
      });
  } catch (e) {
    console.error('error calling student login');
    console.error(e);
    console.error('----------');
    return res.json({ status: false, data: [], message: 'Server error.' });
  }

  return false;
}

function profile(req, res) {
  return res.json({ status: true, data: req.user, message: 'profile' });
}
module.exports = {
  register,
  login,
  profile,
};
