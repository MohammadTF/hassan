/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { STUDENT_REGISTERED } = require('../../../config/constants');
const { Student } = require('../model');
const { Token } = require('../../Token/model');
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
    if (_.isUndefined(student.name)) return res.json({ status: false, data: [], message: 'Name is required.' });
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
    objStudent.name = student.name;
    objStudent.encryptedPassword = bcrypt.hashSync(pwd, 10);
    objStudent.roll = parsedEmail.roll;
    objStudent.year = parsedEmail.year;
    objStudent.department = parsedEmail.department;
    objStudent.deviceId = parsedEmail.deviceId || 'asf';
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

async function checkPwd(password, secondPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, secondPassword, async (err, isMatch) => {
      if (err) {
        console.error('error login');
        console.error(err);
        return reject(err);
      }

      return resolve(isMatch);
    });
  });
}

async function login(req, res) {
  // 11it24@quest.edu.pk
  // uvbf84i4
  //
  // login code
  try {
    console.log('calling login function');
    const { body } = req;
    // console.log({body});
    if (_.isUndefined(body.email)) {
      return res.json({ status: false, data: [], message: 'email is required.' });
    }
    if (_.isUndefined(body.password)) {
      return res.json({ status: false, data: [], message: 'password is required.' });
    }
    if (_.isUndefined(body.deviceId)) {
      return res.json({ status: false, data: [], message: 'deviceId is required.' });
    }
    const student = await Student.findOne({ email: body.email });

    if (!student) {
      return res.json({ status: false, data: [], message: 'that email is not registered' });
    }

    if (!student.status) {
      return res.json({ status: false, data: [], message: 'Your account is not active.' });
    }
    // match pass
    const isMatch = checkPwd(body.password, student.encryptedPassword);

    if (isMatch) {
      const payload = {
        userId: student.id,
        email: student.email,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN,
        {
          expiresIn: process.env.TOKEN_EXPIRE,
        });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
      const _student = student;
      _student.deviceId = body.deviceId;
      await _student.save();
      const _token = new Token(); // create a new instance of the student model
      _token.token = refreshToken;
      _token.user = student.id; // .toString();
      await _token.save();
      // Student.update();
      return res.json({ status: true, data: { ...student._doc, accessToken, refreshToken }, message: 'Login success.' });
    }
    return res.json({ status: false, data: [], message: 'pass incorrect' });
  } catch (e) {
    console.error('error calling student login');
    console.error(e);
    console.error('----------');
    return res.json({ status: false, data: [], message: 'Server error.' });
  }

  return false;
}

function profile(req, res) {
  console.log('calling profile');
  return res.json({ status: true, data: req.user, message: 'profile' });
}

function newToken(req, res) {
  console.log('fetching new token');
  const { token } = req.body;
  console.log('token', token);
  jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) {
      console.error({error_refresh_token: err});
      return res.sendStatus(401);
    }
    const payload = {
      userId: user.userId,
      email: user.email,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN,
      {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
    return res.json({ status: true, data: { accessToken, refreshToken }, message: '' });
  });
}
module.exports = {
  register,
  login,
  profile,
  newToken,
};
