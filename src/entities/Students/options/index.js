const AdminBro = require('admin-bro');
const { Student } = require('../model');

/** @type {AdminBro.ResourceOptions} */
const options = {};
options.properties = {
  notifications: {
    isVisible: false,
  },
  encryptedPassword: {
    isVisible: false,
  },
  deviceId:{
    isVisible: false,
  }
};

options.actions = {
  new: {
    isAccessible: false,
  },
};

module.exports = { options, resource: Student };
