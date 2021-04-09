const mongoose = require('mongoose');
/**
 * Documents Object
 * @typedef {Object} Documents
 * @property {string} title - Title
 * @property {string} description - Body
 * @property {boolean} image - if Documents is silent
 */

const DocumentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student',
  },
});

/**
 * @type {Student}
 */
const Documents = mongoose.model('Documents', DocumentsSchema);

module.exports = { Documents, DocumentsSchema };
