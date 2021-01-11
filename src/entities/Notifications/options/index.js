const AdminBro = require('admin-bro');
const { Notification } = require('../model');
const {sendNotification} = require('../../../Util/push-notification/toMultiple');
/** @type {AdminBro.ResourceOptions} */
const options = {};
options.properties = {
//   title: {
//     components: {
//       list: AdminBro.bundle('../components/city.jsx'),
//     },
//   },
};

options.actions = {
  edit: {
    isAccessible: false,
  },
  delete: {
    isAccessible: false,
  },
  new: {
    before: (req) => {
      if (req.method === 'post') {
        sendNotification('title', 'body');
        console.log('inside');
        return req;
      }
      return req;
    },
  },
};

module.exports = { options, resource: Notification };
