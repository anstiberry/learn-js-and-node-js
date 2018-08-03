var http = require('http')
var fs = require('fs')

var port = Number(process.argv[2])
var path = process.argv[3]

var requestHandler = function (request, response) {    
    fs.createReadStream(path).pipe(response)
}

var server = http.createServer(requestHandler)
server.listen(port)