const fs = require('fs');
const path = require('path');
const storage = require('../storage');
const config = require('config');

const { pathToImagesDir } = config;

const getImage = (req, res, next) => {
  const filePath = pathToImagesDir + req.params.fileName;
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    return res.end('File not found!');
  }
};

const getImages = (req, res, next) => {
  fs.readdir(pathToImagesDir, (err, files) => {
    if (err) {
      res.end('Something went wrong!');
    }
    let uploadedFiles = files
      .map(file => {
        return path.join(pathToImagesDir, file);
      })
      .filter(file => {
        return fs.statSync(file).isFile();
      })
      .map(file => {
        return storage.parseFile(file, req);
      });

    res.type('application/json');
    res.send(uploadedFiles);
  });
};

module.exports = {
  getImage,
  getImages,
};
