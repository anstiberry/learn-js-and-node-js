const storage = require('../storage');
const upload = storage.upload.single('image');

const uploadImage = async (req, res) => {
  upload(req, res, err => {
    if (err) {
      if (err.message) {
        return res.end(err.message);
      } else {
        return res.end(err);
      }
    }
    if (req.file) {
      res.type('application/json');
      res.send(JSON.parse(JSON.stringify(storage.parseFile(req.file.path, req))));
    } else {
      return res.end('Something went wrong!');
    }
  });
};

module.exports = uploadImage;
