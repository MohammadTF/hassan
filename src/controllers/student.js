const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { Student } = require('../model/Students');
const parseEmail = require('../Util/parseEmail');
const randomString = require('../Util/randomString');

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

    /**
     * @type {Student}
     */
    const objStudent = new Student(); // create a new instance of the student model
    objStudent.email = student.email;
    objStudent.encryptedPassword = bcrypt.hashSync(randomString.random, 10);
    objStudent.roll = parsedEmail.roll;
    objStudent.year = parsedEmail.year;
    objStudent.department = parsedEmail.department;
    objStudent.changePasswordScreen = true;

    //   save the student and check for errors
    const isSaved = await objStudent.save();
    console.log('Data saved');
    console.log(isSaved);
    return res.json({status: true, data: isSaved, message: 'Student registered.'});
  } catch (e) {
    console.error('error calling student register');
    console.error(e);
    console.error('----------');
    return res.json({ status: false, data: [], message: 'Server error.' });
  }
}
module.exports = {
  register,
};
