const axios = require('axios');
const cloudinary = require('cloudinary');
const AdminBro = require('admin-bro');
const _ = require('lodash');
const { Notification } = require('../model');
const { sendNotification } = require('../../../Util/push-notification/toMultiple');
const { Student } = require('../../Students/model');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

function sendNotificationToSelectedStudents(req, image) {
  let i = 0;

  while (!_.isUndefined(req.payload[`notifiers.${i}`])) {
    Student.findOne({ _id: req.payload[`notifiers.${i}`] }, (err, obj) => {
      if (err) {
        console.error(err);
        return;
      }

      sendNotification(req.payload.title, req.payload.body, obj.deviceId, image);
    });
    i += 1;
  }
}

async function uploadImageToCloudinary(file) {
  console.log({file: file.path});
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file.path, {}, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
}
/** @type {AdminBro.ResourceOptions} */
const options = {};
options.properties = {
  image: {
    components: {
      edit: AdminBro.bundle('../components/image.edit.jsx'),
      show: AdminBro.bundle('../components/image.list.jsx'),
      list: AdminBro.bundle('../components/image.list.jsx')
    },
  },
};

options.actions = {
  edit: {
    isAccessible: false,
  },
  delete: {
    isAccessible: false,
  },
  new: {
    before: async (req, context) => {
      if (req.method === 'post') {
        const { image: uploadImage, ...otherParams } = req.payload;
        const uploadedImage = await uploadImageToCloudinary(uploadImage);
        const image = uploadedImage.secure_url;
        sendNotificationToSelectedStudents(req, image);
        return {
          ...req,
          payload: {
            ...otherParams,
            image,
          },
        };
      }
      return req;
    },
  },
};

module.exports = { options, resource: Notification };
