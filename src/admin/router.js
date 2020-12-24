const {default: AdminBro} = require('admin-bro');
// const { buildRouter } = require('admin-bro-expressjs');
const { buildRouter } = require('@admin-bro/express');
const express = require('express');
/**
 * Build admin router for admin bro
 * @param {Adminbro} admin
 * @returns {express.Router} router
 */
const buildAdminRouter = (admin) => {
  const router = buildRouter(admin);
  return router;
};

module.exports = buildAdminRouter;
