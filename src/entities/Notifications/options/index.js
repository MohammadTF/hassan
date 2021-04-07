const AdminBro = require('admin-bro');
const _ = require('lodash');
const { Notification } = require('../model');
const { sendNotification } = require('../../../Util/push-notification/toMultiple');
const { Student } = require('../../Students/model');
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
        console.log([JSON.stringify(req.params), JSON.stringify(req.payload)]);
        let i = 0;
        while (!_.isUndefined(req.payload[`notifiers.${i}`])) {
          Student.findOne({ _id: req.payload[`notifiers.${i}`] }, (err, obj) => {
            if (err) {
              console.error(err);
              return;
            }

            sendNotification(req.payload.title, req.payload.body, obj.deviceId);
          });
          i += 1;
        }
        return req;
      }
      return req;
    },
  },
};

module.exports = { options, resource: Notification };
