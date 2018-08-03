// var fs = require('fs')
//     var path = require('path')
    
//     var folder = process.argv[2]
//     var ext = '.' + process.argv[3]
    
//     fs.readdir(folder, function (err, files) {
//       if (err) return console.error(err)
//       files.forEach(function (file) {
//         if (path.extname(file) === ext) {
//           console.log(file)
//         }
//       })
//     })

var fs = require('fs') 
fs.readdir(process.argv[2], 'utf-8', function (err, files) {
    if (err) {
        return console.log(err)
    }
    var filteredFiles = files.filter(function(item){
    	parts = item.split('.')
    	ext = parts[parts.length-1]
    	return ext == process.argv[3] && parts.length>1
    })
    filteredFiles.forEach(function(item, i, arr) {
    	console.log(item);
    })
})