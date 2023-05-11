var util = require('util');

var str = util.format('My %s %d %j', 'str', '123', {test: 'object'});

console.log(str);
console.log('My %s %d %j', 'str', 123, {test: 'object'});
