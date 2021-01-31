const mongoose = require('mongoose');
/**
 * Student Object
 * @typedef {Object} Token
 * @property {string} token
 * @property {number} user_id
 */

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  user_id: {
    type: Number,
  },
});

/**
 * @type {Token}
 */
const Token = mongoose.model('Token', TokenSchema);

module.exports = { Token, TokenSchema };
