const fs = require('fs')  

let file = fs.readFile(process.argv[2], function(err, data){
	if(err){
		console.error(err);
		return;
	}
	let str = data.toString() 
	const newLines = str.split("\n")
	console.log(newLines.length-1)
})
