const mongoose = require('mongoose');
/**
 * Student Object
 * @typedef {Object} Token
 * @property {string} token
 * @property {string} user
 */

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  user: {
    type: String,
  },
});

/**
 * @type {Token}
 */
const Token = mongoose.model('Token', TokenSchema);

module.exports = { Token, TokenSchema };
