const multer = require('multer');
const path = require('path');


// Multer middleware for handling multipart/form-data
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'image');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  module.exports ={
  upload
  }