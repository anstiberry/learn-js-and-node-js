var fs = require('fs')
var path = require('path')
    
module.exports = function(folder, ext, callback) {
    fs.readdir(folder, function(err, files) {
        if (err) return callback(err)
        else { 
        	if (ext[0] != '.') var extname = '.' + ext;
        	else var extname = ext;
	        var filteredFiles = files.filter(function(file) {
	            if(path.extname(file) === extname) {
	            	console.log(file)
	            	return true
	            }
	        })
	        return callback(null, filteredFiles);
	    }
    })
}
