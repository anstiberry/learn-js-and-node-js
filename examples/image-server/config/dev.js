const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  host: '0.0.0.0',
  port: 3009,
  pathToImagesDir: process.env.PATH_TO_IMAGES_DIR || path.join(__dirname, '..', '/images/'),
};
