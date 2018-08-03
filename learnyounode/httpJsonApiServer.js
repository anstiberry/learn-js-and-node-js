var http = require('http')
var url = require('url')

function parsetime (time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}
    
function unixtime (time) {
    return { unixtime: time.getTime() }
}

var requestHandler = function (request, response) {    
    var parsedUrl = url.parse(request.url, true)
	var time = new Date(parsedUrl.query.iso)
    var answer 
    if (parsedUrl.query.iso) {
	    if (parsedUrl.pathname == "/api/parsetime") {
		    answer = parsetime(time)
	    } else if (parsedUrl.pathname == "/api/unixtime") {
	    	answer = unixtime(time)
	    } 
	} 
	if (!answer) {
		response.writeHead(404)
		return response.end('wrong query\n')
	}
    response.writeHead(200, { 'Content-Type': 'application/json' })
    return response.end(JSON.stringify(answer))
}

var server = http.createServer(requestHandler)
server.listen(Number(process.argv[2]))