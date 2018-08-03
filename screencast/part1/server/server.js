var http = require('http');

var server = new http.Server(); //EventEmitter

server.listen(8000);

//all events:
//listening, connection, request, timeout
var emit = server.emit;
server.emit = function (event) {
    console.log(event);
    emit.apply(server, arguments)
};

var counter = 0;
server.on('request', function (req, res) {
    res.end('Hello world! ' + ++counter);
});

// Second variant
// http.createServer(function (req, res) {
//     res.end('Hello world');
// }).listen(8000);