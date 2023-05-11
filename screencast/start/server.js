var log = require('logger')(module);
var db = require('db');
db.connect();

var User = require('./user');

function run() {
    var karpo = new User("Карпо");
    var motria = new User("Мотря");

    karpo.hello(motria);

    log(db.getPhrase("Run successful"))
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}