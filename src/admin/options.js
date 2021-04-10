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
    logo: 'https://res.cloudinary.com/dmv8gen17/image/upload/v1618037782/DNMS_LOGO_stmhw1.png',
    softwareBrothers: false,
  },
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminBro.bundle('./components/my-dashboard-component')
  },
};

module.exports = options;
