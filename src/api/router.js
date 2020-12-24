const express = require('express');

const router = express.Router();
const { register } = require('../controllers/student');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page');
});
/**
 * Register student
 */
router.post('/register', register);

module.exports = router;
