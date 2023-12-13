const fs = require('fs')  
let file = fs.readFileSync(process.argv[2])
let str = file.toString() 

const newLines = str.split("\n")
console.log(newLines.length-1)