const AdminBro = require('admin-bro');
const { Student } = require('../model');

/** @type {AdminBro.ResourceOptions} */
const options = {};
options.properties = {
  encryptedPassword: {
    isVisible: false,
  },
};

options.actions = {
  new: {
    isAccessible: false,
  },
};

module.exports = { options, resource: Student };
