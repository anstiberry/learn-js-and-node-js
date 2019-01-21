const fs = require('fs');
const config = require('config');

const { pathToImagesDir } = config;

const deleteImage = async (req, res) => {
  const filePath = pathToImagesDir + req.params.fileName;
  if (!fs.existsSync(filePath)) {
    return res.end('File not found!');
  }

  fs.unlink(filePath, err => {
    if (err) {
      return res.end(err);
    }
    return res.end('File was deleted');
  });
};

module.exports = deleteImage;
