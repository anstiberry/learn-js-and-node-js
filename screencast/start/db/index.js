var phrases;

exports.connect = function () {
    phrases = require('./uk')
};

exports.getPhrase = function (name) {
    if (!phrases[name]) {
        throw new Error("There is no such phrase: " + name);
    }
    return phrases[name];
};