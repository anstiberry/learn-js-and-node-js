var http = require('http')
var map = require('through2-map')

var port = Number(process.argv[2])
var requestHandler = function (request, response) {    
    if (request.method !== 'POST') {
    	return response.end('send me a POST\n')
    }

    request.pipe(map(function(chunk) {
    	return chunk.toString().toUpperCase()
    })).pipe(response)
}

var server = http.createServer(requestHandler)
server.listen(port)