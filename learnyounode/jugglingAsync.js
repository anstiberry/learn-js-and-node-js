const http = require('http')
const bl = require('bl');

var urls = process.argv.slice(2)
var results = []
var count = 0

urls.forEach(function(url, i) {
	http.get(url, function(response) {
	    response.pipe(bl(function (err, data) {
	    	if (err) console.error(err)
	    	results[i] = data.toString()
	    	count++

	    	if (count === urls.length)
	    		results.forEach(function(res) {
					console.log(res)
				})
	    }))
	})
})