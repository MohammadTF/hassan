/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { Token } = require('../model');
require('dotenv').config();

function fetch(req, res) {
  console.log('calling fetch/token function');
  const { body } = req;
  Token.findOne({ token: body.token })
    .then((token) => {
      if (!token) {
        return res.json({ status: false, data: [], message: 'Token not found' });
      }
      return res.json(token);
      // const payload = {
      //   userId: student.id,
      //   email: student.email,
      // };

      // const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN,
      //   {
      //     expiresIn: process.env.TOKEN_EXPIRE,
      //   });
      // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
      // // Student.update();
      // return res.json({ status: true, data: { ...student._doc, accessToken, refreshToken }, message: 'Login success.' });
    })
    .catch((err) => {
      console.error(err);
      return res.json({ status: false, data: [], message: 'server error' });
    });
}

module.exports = {
  fetch,
};
