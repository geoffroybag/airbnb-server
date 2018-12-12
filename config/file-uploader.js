const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

// "cloudinary" is the npm package to use the Cloudinary API
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
})

// "multer-storage-cloudinary" tells "multer" to send uploaded files to Cloudinary
const storage = cloudinaryStorage({
  cloudinary,
  folder: "app-images",
  // in case you want to upload files other than images
  // params: {
  //   resource_type: "raw",
  // }
});

// "multer" integrates with Express routes to receive uploaded files
const fileUploader = multer({ storage });

module.exports = fileUploader;