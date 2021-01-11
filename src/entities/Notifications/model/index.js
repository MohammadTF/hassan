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
  },
  body: {
    type: String,
  },
  silent: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

/**
 * @type {Student}
 */
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification, NotificationSchema };
