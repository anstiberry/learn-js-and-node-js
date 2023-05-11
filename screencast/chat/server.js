var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function (req, res) {

    switch (req.url) {
        case '/':
            sendFile('index.html', res);
            break;

        case '/subscribe':
            chat.subscribe(req, res);
            break;

        case '/publish':
            var body = '';

            req.
                on('readable', function () {
                    var buf = req.read();
                    if (!buf) {
                        body += '';
                    } else {
                        body += buf;
                        if (body.length > 1e4) {
                            res.statusCode = 413;
                            res.end('Your message is too big');
                        }
                    }
                })
                .on('end', function () {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        res.statusCode = 400;
                        res.end('Bad request');
                        return;
                    }
                    chat.publish(body.message);
                    res.end('Ok');
                });
            break;

        default:
            res.statusCode = 404;
            res.end('Not found');
    }

}).listen(8001);

function sendFile(fileName, res) {

    var file = fs.createReadStream(fileName);

    file.pipe(res);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server error!');
        console.error(err);
    });

    res.on('close', function () {
        file.destroy();
    });
}