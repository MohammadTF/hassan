const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const StudentOptions = require('../entities/Students/options');
const NotificationOptions = require('../entities/Notifications/options');
const DocumentsOptions = require('../entities/Documents/options');

/** @type  {AdminBro.AdminBroOptions} */
const options = {
  resources: [StudentOptions, NotificationOptions, DocumentsOptions],
  rootPath: '/admin',
  branding: {
    companyName: 'Student Portal',
    softwareBrothers: true,
  },
};

module.exports = options;
