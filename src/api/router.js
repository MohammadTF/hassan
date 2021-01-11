const express = require('express');

const router = express.Router();
const { register, login, profile } = require('../entities/Students/controller');
const authJwt = require('../Middleware/authJwt');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  res.send('api homepage');
});
/**
 * Register student
 */
router.post('/register', register);
/**
 * Login student
 */
router.post('/login', login);
/**
 * Profile Student
 */
router.post('/profile', authJwt, profile);

module.exports = router;
