const axios = require('axios');
const cloudinary = require('cloudinary');
const AdminBro = require('admin-bro');
const _ = require('lodash');
const { Documents } = require('../model');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

async function uploadImageToCloudinary(file) {
  console.log({ file: file.path });
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
  images: {
    components: {
      edit: AdminBro.bundle('../components/images.edit.jsx'),
      show: AdminBro.bundle('../components/images.list.jsx'),
      list: AdminBro.bundle('../components/images.list.jsx'),
    },
  },
};

options.actions = {
  new: {
    before: async (req) => {
      if (req.method === 'post') {
        const { images: uploadImage, ...otherParams } = req.payload;
        const imagesArr = AdminBro.flat.get(req.payload, 'images');
        const uploadedImagePromise = [];
        for (let i = 0; i < imagesArr.length; i += 1) {
          uploadedImagePromise.push(uploadImageToCloudinary(imagesArr[i]));
        }
        const uploadedImages = await Promise.all(uploadedImagePromise);
        console.log({ abc: uploadedImages.map((o) => o.secure_url) });
        return {
          ...req,
          payload: {
            ...otherParams,
            images: uploadedImages.map((o) => o.secure_url),
          },
        };
      }
      return req;
    },
  },
};

module.exports = { options, resource: Documents };
