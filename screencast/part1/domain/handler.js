var fs = require('fs');

module.exports = function handler(req, res) {

    if (req.url == '/') {
        fs.readFile('index.html', function (err, content) {
            if (err) throw err;
            // {
            //     console.error(err);
            //     res.statusCode = 500;
            //     res.end('Server error');
            //     return;
            // }
            res.end(content);
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
};