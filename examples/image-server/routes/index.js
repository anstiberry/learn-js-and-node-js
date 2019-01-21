const path = require('path');
const express = require('express');
const router = express.Router();

const uploadImage = require('./upload');
const deleteImage = require('./delete');
const images = require('./images');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views/index.html'));
});

router.post('/upload', uploadImage);
router.get('/images/:fileName', images.getImage);
router.get('/images', images.getImages);
router.get('/deleteImage/:fileName', deleteImage);

module.exports = router;
