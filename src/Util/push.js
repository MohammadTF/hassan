const Pusher = require('pusher');
require('dotenv').config();
/**
 * Sending push notification on web
 * @param {string} event
 * @param {string} message
 */
function push(event, message) {
  if (process.env.ALLOW_PUSH !== true) return true;
  const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  });

  pusher.trigger('admin-notification', event, {
    message,
  });
}
module.exports = push;
