const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const StudentOptions = require('../Students/options');

/** @type  {AdminBro.AdminBroOptions} */
const options = {
  resources: [StudentOptions],
  rootPath: '/admin',
  branding: {
    companyName: 'Student Portal',
    softwareBrothers: true,
  },
  dashboard: {
    handler: async () => ({ some: 'output' }),
    component: AdminBro.bundle('./components/my-dashboard-component'),
  },
};

module.exports = options;
