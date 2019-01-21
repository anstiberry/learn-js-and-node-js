const fs = require('fs');
const path = require('path');
const bytes = require('bytes');
const multer = require('multer');
const config = require('config');

const { pathToImagesDir, imageTypes, maxFileSize } = config;

const parseFile = (file, req) => {
  let parsedFile = path.parse(file);
  let fullUrl = req.protocol + '://' + req.get('host') + '/images/';
  return {
    name: parsedFile.base,
    url: fullUrl + parsedFile.base,
    size: bytes(fs.statSync(file).size),
    date: fs.statSync(file).ctime,
  };
};

// create a storage which says where and how the images should be saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(pathToImagesDir)) {
      fs.mkdirSync(pathToImagesDir);
    }
    cb(null, pathToImagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// the function should call `cb` with a boolean
// to indicate if the file should be accepted
const fileFilter = (req, file, cb) => {
  if (file.originalname.match(imageTypes)) {
    cb(null, true);
  } else {
    cb('File format is not appropriate!');
  }
};

const limits = {
  fileSize: maxFileSize,
};

// create a multer object
const upload = multer({ storage, limits, fileFilter });

module.exports = {
  parseFile,
  upload,
};
