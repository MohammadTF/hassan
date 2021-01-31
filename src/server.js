require('dotenv').config();
const express = require('express');
const { default: AdminBro } = require('admin-bro');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { options, router: buildAdminRouter } = require('./admin');
const apiRouter = require('./api/router');

const app = express();
const port = process.env.PORT || 3000; // process.env ✓
const host = process.env.HOST || 'http://localhost'; // process.env ✓

const run = async () => {
  mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('useFindAndModify', false);
  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(options.rootPath, router);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('combined'));
  app.use('/api', apiRouter);
  app.listen(port, () => console.log(`Running at: ${host}:${port}`));
};

module.exports = run;
