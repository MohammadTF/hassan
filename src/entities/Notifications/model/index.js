const mongoose = require('mongoose');
/**
 * Notifications Object
 * @typedef {Object} Notifications
 * @property {string} title - Title
 * @property {string} body - Body
 * @property {boolean} silent - if notification is silent
 * @property {string} type -
 * @property {string} data -
 */

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  notifiers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
});

/**
 * @type {Student}
 */
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification, NotificationSchema };
