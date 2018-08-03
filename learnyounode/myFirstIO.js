var fs = require('fs') 
try {
    var content = fs.readFileSync(process.argv[2], 'utf-8')
} catch (ex) {
    console.log(ex)
}
var lines = content.split('\n').length-1
console.log(lines)