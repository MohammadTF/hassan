const mongoose = require('mongoose');
/**
 * Student Object
 * @typedef {Object} Student
 * @property {string} name - Student name
 * @property {string} batch - Batch
 * @property {string} email - Email of student
 * @property {string} encryptedPassword - Password of student
 * @property {string} department - department of student
 * @property {number} roll - roll number of student
 * @property {number} year - year of admission
 * @property {boolean} changePasswordScreen - check if we should show change pwd screen or not
 * @property {boolean} status - check if we should show change pwd screen or not
 * @property {string} deviceId - check if we should show change pwd screen or not
 */

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  batch: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  changePasswordScreen: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  deviceId: {
    type: String,
  },
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
  }],
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documents',
  }],
});

/**
 * @type {Student}
 */
const Student = mongoose.model('Student', StudentSchema);

module.exports = { Student, StudentSchema };
