const http = require('http')
const bl = require('bl');

var url = process.argv[2]

const callback = function(response) {
    response.pipe(bl(function (err, data) {
    	if (err) console.log("Error!")
    	else {
    		data = data.toString()
    		console.log(data.length)
    		console.log(data)
    	}
    }))
}


http.get(url, callback).on("error", console.error)