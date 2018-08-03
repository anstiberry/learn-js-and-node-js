const http = require('http')

var url = process.argv[2]

const callback = function(response) {
    var answer = response.setEncoding("utf8")
	answer.on("data", console.log)
}

http.get(url, callback).on("error", console.error)