var User = require('models').User;

module.exports.get = function (req, res, next) {
  res.render('login');
};

module.exports.post = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // check if user exist

};