const http = require('http')

var url = process.argv[2]

const callback = function(response) {
    var answer = response.setEncoding("utf8")
    var data = "";
    answer.on("data", function(item){
		data += item
	})
	answer.on("end", function(item){
		console.log(data.length)
		console.log(data)
	})
}


http.get(url, callback).on("error", console.error)