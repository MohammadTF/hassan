const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const { Student } = require('../model/Students');

/** @type  {AdminBro.AdminBroOptions} */
const options = {
  resources: [Student],
  rootPath: '/admin',
};

module.exports = options;
