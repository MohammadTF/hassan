const { default: AdminBro } = require('admin-bro');
// const { buildRouter } = require('admin-bro-expressjs');
const { buildAuthenticatedRouter } = require('@admin-bro/express');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

/**
 * Build admin router for admin bro
 * @param {Adminbro} admin
 * @returns {express.Router} router
 */
const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    authenticate:
      async (email, password) => email === process.env.ADMIN && password === process.env.PASSWORD,
    // const user = await User.findOne({ email });
    // if (user) {
    //   const matched = await bcrypt.compare(password, user.encryptedPassword);
    //   if (matched) {
    //     return user;
    //   }
    // }
    // return false;
    cookieName: process.env.COOKIE_NAME,
    cookiePassword: process.env.COOKIE_PWD,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  });
  return router;
};

module.exports = buildAdminRouter;
